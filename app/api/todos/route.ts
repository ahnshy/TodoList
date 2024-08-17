import { NextRequest, NextResponse } from "next/server";
import dummyTodos from '@/data/sample.json'

// get all list
export async  function GET(req: Request){
  const res = {
    message: 'get all lists success!',
    data: dummyTodos
  }
  return NextResponse.json(res, { status: 200 });
}

// add to job
export async  function POST(req: NextRequest) {

  // 요청한 json에서 특정 필드값만 받는다.
  //const { title } = await req.json();

  // 받은 요청의 json 그대로 return = echo service
  //const data = await req.json();
  //return Response.json(data);

  const { title } = await req.json();

  const newTodo = {
    id: "10",
    title,
    id_done:false
  }

  const res = {
    message: 'todo add to success!',
    data: newTodo
  }

  return res.json(res, {status: 200 });
}
