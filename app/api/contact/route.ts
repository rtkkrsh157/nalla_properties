import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Web3Forms access key is not configured.",
        },
        { status: 500 }
      );
    }

    const web3Response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Origin": "https://ubiquitous-donut-f70147.netlify.app",
          "Referer": "https://ubiquitous-donut-f70147.netlify.app/",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Enquiry - Nalla Properties",
          ...body,
        }),
      }
    );

    const responseText = await web3Response.text();

    console.log(
      "Web3Forms status:",
      web3Response.status
    );

    console.log(
      "Web3Forms response:",
      responseText
    );

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: `Web3Forms returned HTTP ${web3Response.status}.`,
        },
        { status: 502 }
      );
    }

    if (!web3Response.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            data.message ||
            `Web3Forms returned HTTP ${web3Response.status}.`,
        },
        { status: web3Response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send enquiry.",
      },
      { status: 500 }
    );
  }
}
