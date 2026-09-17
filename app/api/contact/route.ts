import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("Web3Forms access key is missing");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", // Bypasses some bot protections
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Enquiry - Nalla Properties",
        ...body,
      }),
    });

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Web3Forms returned non-JSON:", responseText);
      throw new Error(`Web3Forms returned HTML (Status ${response.status}). First 100 chars: ${responseText.substring(0, 100)}`);
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Web3Forms API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send enquiry. Error: " + (error?.message || String(error)),
      },
      { status: 500 }
    );
  }
}
