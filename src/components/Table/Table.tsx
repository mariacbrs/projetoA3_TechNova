import './Table.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Eye, Edit, Trash2 } from 'lucide-react';

type Column = {
    header: string;
    accessor: string;
    type: 'text' | 'number' | 'date' | 'image';
};

type TableProps = {
    readonly columns: Column[];
    readonly data: Record<string, any>[];
    readonly actions?: {
        readonly visualizar?: (item: any) => void;
        readonly editar?: (item: any) => void;
        readonly excluir?: (item: any) => void;
    };
    readonly width?: string | number;
    readonly height?: string | number;
};

export function Table({
    columns,
    data,
    actions,
    width,
    height,
}: TableProps) {
    const wrapperStyle = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        overflow: 'auto',
    } as React.CSSProperties;

    return (
        <div className="table-wrapper" style={wrapperStyle}>
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor} className={`col-${col.type}`}>
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="col-actions">Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col) => {
                                const value = row[col.accessor];
                                let formatted = value;

                                if (col.type === 'date') {
                                    formatted = format(new Date(value), 'dd/MM/yyyy', { locale: ptBR });
                                } else if (col.type === 'number') {
                                    formatted = parseFloat(value).toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    });
                                }

                                return (
                                    <td
                                        key={col.accessor}
                                        className={`col-${col.type}`}
                                        title={col.type === 'text' ? value : ''}
                                    >
                                        {col.type === 'image' ? (
                                            <img
                                                src={value}
                                                alt={col.header}
                                                style={{ height: '40px', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            formatted
                                        )}
                                    </td>
                                );
                            })}

                            {actions && (
                                <td className="col-actions">
                                    {actions.visualizar && (
                                        <button onClick={() => actions.visualizar?.(row)} title="Visualizar">
                                            <Eye size={18} />
                                        </button>
                                    )}
                                    {actions.editar && (
                                        <button onClick={() => actions.editar?.(row)} title="Editar">
                                            <Edit size={18} />
                                        </button>
                                    )}
                                    {actions.excluir && (
                                        <button onClick={() => actions.excluir?.(row)} title="Excluir">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
