import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { revalidatePath } from "next/cache"

interface IStudent {
  id: number,
  title: string,
  description: string
}

export default async function ListBook() {
  const books = await list()
  async function list() {
    revalidatePath("/admin/books")
    const response = await fetch("https://server20241-six.vercel.app/books")
    return response.json();
  }

  async function deleteBook(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    const response = await fetch("https://server20241-six.vercel.app/books/"+id, {method: "DELETE"});
    revalidatePath("/admin/books")

  }

  return (
    <Table>
      <TableCaption>Lista de Livros</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((item:IStudent) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteBook}>EXCLUIR</Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table >
  )
}