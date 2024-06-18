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

interface IRestaurant {
  id: number,
  name: string,
  address: string
}

export default async function ListRestaurant() {
  const restaurants = await list()
  async function list() {
    revalidatePath("/admin/restaurant")
    const response = await fetch("https://server20241-six.vercel.app/restaurants")
    return response.json();
  }

  async function deleteRestaurant(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    const response = await fetch("https://server20241-six.vercel.app/restaurants/"+id, {method: "DELETE"});
    revalidatePath("/admin/restaurant")

  }

  return (
    <Table>
      <TableCaption>Lista de Restaurantes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {restaurants.map((item:IRestaurant) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteRestaurant}>
                <Trash2 className="mr-3" />EXCLUIR</Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table >
  )
}