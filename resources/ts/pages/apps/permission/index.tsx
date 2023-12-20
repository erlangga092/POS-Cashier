import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

import { SimplePagination } from "@/components/simple-pagination";
import { Input } from "@/components/ui/input";
import { useFilter } from "@/hooks/use-filter";
import { LayoutApps } from "@/layouts/apps/layout-apps";
import { Head } from "@inertiajs/react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import {
  PermissionType,
  PermissionWithPaginationType,
} from "@/types/permission";

const SortIndicator = ({
  label,
  field,
  column,
  direction,
}: {
  label: string;
  field: string;
  column: string;
  direction: string;
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      {field === column ? (
        direction === "asc" ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )
      ) : (
        <ChevronsUpDown className="h-4 w-4" />
      )}
    </div>
  );
};

const PermissionPage = ({
  state,
  permissions,
}: {
  state: {
    limit: string;
    page: number;
    search: string;
    field: string;
    direction: string;
  };
  permissions: PermissionWithPaginationType;
}) => {
  const [params, setParams] = useState(state);

  useFilter({
    route: route("apps.permissions.index"),
    values: params,
    only: ["permissions"],
  });

  function handleSort(newField: string) {
    let newDirection = params?.direction ?? "asc";
    const field = params?.field ?? "name";

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc";
    }

    setParams({
      ...params,
      field: newField,
      direction: newDirection,
    });
  }

  return (
    <>
      <Head>
        <title>POS - Permission</title>
      </Head>
      <LayoutApps>
        <div className="space-y-6">
          <div className="space-y-2">
            <CardTitle>Permissions</CardTitle>
            <CardDescription>
              The list of permissions in your application.
            </CardDescription>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Select
                    value={params?.limit}
                    onValueChange={(e) => setParams({ ...params, limit: e })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={params?.limit ?? 10} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="75">75</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    type="text"
                    value={params?.search}
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    placeholder="Pencarian..."
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead onClick={() => handleSort("name")}>
                      <SortIndicator
                        label="Name"
                        column="name"
                        field={params?.field}
                        direction={params?.direction}
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.data.map(
                    (permission: PermissionType, i: number) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">
                          {permissions.meta.from + i}
                        </TableCell>
                        <TableCell>{permission.name}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <SimplePagination
                meta={permissions.meta}
                links={permissions.links}
              />
            </CardFooter>
          </Card>
        </div>
      </LayoutApps>
    </>
  );
};

export default PermissionPage;
