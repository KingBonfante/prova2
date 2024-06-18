import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react"
import ListRestaurant from "./List";

export default function Book() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/restaurant/new">
                    <Button>
                        <CirclePlus className="mr-3" />
                        Cadastrar Restaurante</Button>
                </a>
            </div>
            <ListRestaurant />
        </div>
    )
}