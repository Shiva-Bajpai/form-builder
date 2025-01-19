import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token: accessToken } = await req.json();
    if (accessToken) {
      const response = NextResponse.json({ success: true });

      response.cookies.set("guest_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      return response;
    }
    return NextResponse.json({ success: false, data: {} }, { status: 500 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      { success: false, data: {}, message: error?.message },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
