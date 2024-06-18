import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react"
import ListCustomer from "./List";

export default function Book() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/customer/new">
                    <Button>
                        <UserPlus className="mr-3" />
                        Cadastrar Cliente</Button>
                </a>
            </div>
            <ListCustomer />
        </div>
    )
}