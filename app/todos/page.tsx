import { title } from "@/components/primitives";
import TodosLayout from "@/app/todos/layout";
import TodosTable from "@/components/todos-table"
import { fetchTodos } from "@/data/firestore";

async function getInitialTodosList() {
  console.log("getInitialTodosList called.");
  //await new Promise(f => setTimeout(f, 3000)); // 3초 대기 후 10 리턴
  //const response = await fetchTodos();
  const response = await fetch(`${process.env.BASE_API_URL}/todos/`)
 // console.log(response);

  if (!response.ok){
    throw new Error('Failed to fetch data')
  }

  return response.json();
}

export default async function TodosPage() {

  const res = await getInitialTodosList();

  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTable todos={res.data ?? []} />
    </div>
  );
}
