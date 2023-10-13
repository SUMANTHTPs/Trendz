import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const pinCodes = [560037, 577005, 577225, 560060, 560098, 117008];
  try {
    const reqBody = await request.json();
    const pinCode = reqBody;
    const isServiceable = pinCodes.includes(pinCode);
    return NextResponse.json(
      {
        isServiceable: isServiceable,
        msg: "Pin code is serviceable",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        msg: "Pin code is not serviceable",
      },
      {
        status: 500,
      }
    );
  }
}
