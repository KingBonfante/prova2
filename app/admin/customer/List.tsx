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
import { Trash2 } from "lucide-react"

interface ICustomer {
  id: number,
  name: string,
  email: string
}

export default async function ListCustomer() {
  const customers = await list()
  async function list() {
    revalidatePath("/admin/customer")
    const response = await fetch("https://server20241-six.vercel.app/customers")
    return response.json();
  }

  async function deleteCustomer(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    const response = await fetch("https://server20241-six.vercel.app/customers/" + id, { method: "DELETE" });
    revalidatePath("/admin/customer")

  }

  return (
    <Table>
      <TableCaption>Lista de Clientes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((item: ICustomer) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteCustomer}>
                  <Trash2 className="mr-3" />EXCLUIR</Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table >
  )
}