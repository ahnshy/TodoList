import { NextRequest, NextResponse } from "next/server";
import { request } from "http";

export async  function GET(req: NextRequest,
                           { params }: { params: {id: string} }) {

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get('query')

  const res = {
    message: 'welcome to api id test',
    data: {
      id: params.id,
      title : "Get Parameter",
      is_done: false,
      search
    }
  }
  return NextResponse.json(res, { status: 200 });
}
