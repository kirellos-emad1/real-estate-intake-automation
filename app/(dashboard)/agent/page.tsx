import { getLeadsData } from "@/data/get-leads";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Users,
    ChevronLeft,
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Plus
} from "lucide-react";

export default async function LeadsPage({
    searchParams
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1", 10);
    const { data: leads, hasMore } = await getLeadsData(currentPage);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'new':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'contacted':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            case 'qualified':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'converted':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
            case 'lost':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    return (
        <div className=" py-24  ">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight ">
                            Leads Dashboard
                        </h1>
                        <p className="">
                            Manage and track your real estate leads
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={'/book-a-viewing'}>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Lead
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium ">
                                Total Leads
                            </CardTitle>
                            <Users className="h-4 w-4 " />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold ">{leads.length}</div>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium ">
                                Received
                            </CardTitle>
                            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold ">
                                {leads.filter(lead => lead.status?.toLowerCase() === 'received').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium ">
                                Emailed
                            </CardTitle>
                            <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold ">
                                {leads.filter(lead => lead.status?.toLowerCase() === 'emailed').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium ">
                                Texted
                            </CardTitle>
                            <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold ">
                                {leads.filter(lead => lead.status?.toLowerCase() === 'texted').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Leads Table */}
                <Card className="">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold ">
                            All Leads
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold">Name</TableHead>
                                        <TableHead className="font-semibold">Contact</TableHead>
                                        <TableHead className="font-semibold">Property</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leads.map((lead) => (
                                        <TableRow key={lead.id} >
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold ">
                                                        {lead.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-3 w-3" />
                                                        {lead.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="h-3 w-3" />
                                                        {lead.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm ">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="max-w-[200px] truncate">
                                                        {lead.property_address}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={getStatusColor(lead.status)}
                                                >
                                                    {lead.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <div className="text-sm ">
                        Showing page {currentPage} of leads
                    </div>
                    <div className="flex items-center gap-2">
                        {currentPage > 1 && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`?page=${currentPage - 1}`} className="gap-2">
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Link>
                            </Button>
                        )}
                        {hasMore && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`?page=${currentPage + 1}`} className="gap-2">
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}