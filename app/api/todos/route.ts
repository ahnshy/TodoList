import { NextRequest, NextResponse } from "next/server"
import { fetchTodos, addTodos } from "@/data/firestore"
import dummyTodos from '@/data/sample.json'


// get all list
export async  function GET(req: NextRequest){

  const fetchedTodos = await fetchTodos();
  const res = {
    message: 'get all lists success!',
    //data: dummyTodos // for test
    data: fetchedTodos
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

  if (title === undefined) {
    const errorMessage = {
      message : 'input a title.'
    }
    return NextResponse.json(errorMessage, { status: 422 });
  }

  const addedTodo = await addTodos({ title });

  const newTodo = {
    //id: "10",
    message: "add to do success.!",
    title
    //is_done:false
  }

  const res = {
    message: 'to do add to success!',
    data: newTodo
  }

  return res.json(res, {status: 200 });
}
