import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const pinCodes = [560037, 577005, 577225, 560060, 560098, 117008];
  try {
    const reqBody = await request.json();
    const pinCode = reqBody;
    const isServiceable = pinCodes.includes(pinCode);
    return NextResponse.json({ isServiceable: isServiceable }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
