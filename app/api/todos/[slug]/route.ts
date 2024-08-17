import { NextResponse } from "next/server";

// get single item by id
export async  function GET(req: Request,
                           { params }: { params: {slug: string} }) {
  const res = {
    message: 'get single item by id',
    data: {
      id: params.slug,
      title : "Get Parameter",
      is_done: false
    }
  }
  return NextResponse.json(res, { status: 200 });
}

// delete single item by id
export async  function DELETE(req: Request,
                           { params }: { params: {slug: string} }) {
  const res = {
    message: 'delete single item by id',
    data: {
      id: params.slug,
      title : "delete Parameter",
      is_done: false
    }
  }
  return NextResponse.json(res, { status: 200 });
}
