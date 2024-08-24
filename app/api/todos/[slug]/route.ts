import { NextRequest, NextResponse } from "next/server";
import { getTodo, deleteTodo, updateTodo } from "@/data/firestore";

// get single item by id
export async  function GET(req: NextRequest,
                           { params }: { params: {slug: string} }) {

  const getedTodo = await getTodo(params.slug);

  if (getedTodo === null) {
    return new Response("slug is empty",{ status : 200 });
  }

  const res = {
    message: 'get single item by id succeed!',
    data: getedTodo
  }
  return NextResponse.json(res, { status: 200 });
}

// delete single item by id
export async  function DELETE(req: Request,
                           { params }: { params: {slug: string} }) {

  const deletedTodo = await deleteTodo(params.slug);

  if (deletedTodo === null) {
    return new Response(null,{ status : 204 });
  }

  const res = {
    message: 'delete single item by id succeed!'
  }
  return NextResponse.json(res, { status: 200 });
}

// modify single item by id
export async  function POST(req: Request,
                              { params }: { params: {slug: string} }) {

  const { title, is_done } = await req.json();

  // const editTodo = {
  //   id: params.slug,
  //   title,
  //   is_done
  // }

  const updatedTodo = await updateTodo(params.slug, { title, is_done });

  if (updatedTodo === null) {
    return new Response(null,{ status : 204 });
  }

  const res = {
    message: 'modify single item by id succeed!',
    data: updatedTodo
  }
  return NextResponse.json(res, { status: 200 });
}

