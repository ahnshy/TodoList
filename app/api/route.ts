import { NextResponse } from "next/server";

export async  function GET(req: Request){
  const res = {
    message: 'welcome to api',
    data: ['Jan', 'Feb', 'mar']
  }
  return NextResponse.json(res, { status: 200 });
}

//export async  function GET(req: Request){
//  return new Response('welcome to api');
//}
