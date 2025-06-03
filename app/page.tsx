import { prisma } from "@/lib/prisma";
import { createTodo } from "@/server/todo";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <form
          action={async (formData: FormData) => {
            "use server";
            const title = formData.get("title") as string;
            if (!title?.trim()) return;
            await createTodo(title);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            name="title"
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Todo
          </button>
        </form>
      </div>

      <div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center p-3 bg-white rounded-lg shadow">
              <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
              <span className="ml-2 text-sm text-gray-500">- {todo.completed ? "Completed" : "Pending"}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
