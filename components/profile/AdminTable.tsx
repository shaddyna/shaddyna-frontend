
/*import { Edit, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminTableProps {
  title: string;
  columns: {
    key: string;
    label: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }[];
  data: any[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
  error?: string | null;
  pagination?: any;
  onPageChange?: (page: number) => void;
  onSearch?: (term: string) => void;
  renderActions?: (item: any) => React.ReactNode;
}

export const AdminTable = ({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  loading,
  error,
  renderActions,
}: AdminTableProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Button onClick={onAdd} className="gap-2">
          <Plus size={16} /> Add {title.split(" ")[0]}
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#bf2c7e]"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#bf2c7e]">
            <thead className="bg-black">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#bf2c7e]">
              {data.map((item) => (
                <tr key={item._id || item.id}>
                  {columns.map((column) => (
                    <td
                      key={`${item._id || item.id}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {column.render 
                        ? column.render(item[column.key], item)
                        : <div className="text-sm text-gray-900">
                            {item[column.key] || "N/A"}
                          </div>
                      }
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {renderActions ? (
                        renderActions(item)
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(item._id || item.id)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="lg"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => onDelete(item._id || item.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};*/

import { Edit, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminTableProps {
  title: string;
  columns: {
    key: string;
    label: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }[];
  data: any[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
  error?: string | null;
  pagination?: any;
  onPageChange?: (page: number) => void;
  onSearch?: (term: string) => void;
  renderActions?: (item: any) => React.ReactNode;
}

export const AdminTable = ({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  loading,
  error,
  renderActions,
}: AdminTableProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Button onClick={onAdd} className="gap-2">
          <Plus size={16} /> Add {title.split(" ")[0]}
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#bf2c7e]"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#bf2c7e]">
            <thead className="bg-black">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#bf2c7e]">
              {data.map((item) => (
                <tr key={item._id || item.id}>
                  {columns.map((column) => (
                    <td
                      key={`${item._id || item.id}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {column.render 
                        ? column.render(item[column.key], item)
                        : <div className="text-sm text-gray-900">
                            {item[column.key] || "N/A"}
                          </div>
                      }
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {renderActions ? (
                        renderActions(item)
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(item._id || item.id)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="lg"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => onDelete(item._id || item.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};