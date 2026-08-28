import React from 'react';
import { Pagination, Spin } from 'antd';

export default function CustomTable({
  columns,
  dataSource,
  rowKey,
  pagination,
  loading,
  onChange,
  scroll,
}) {
  const handlePageChange = (page, pageSize) => {
    if (onChange) {
      onChange({ current: page, pageSize }, {}, {});
    }
  };

  return (
    <div
      className="crm-dashboard-card"
      style={{
        backgroundColor: 'var(--bg-surface, #ffffff)',
        borderRadius: '10px',
        boxShadow: '0 2px 6px 0 rgba(67, 89, 113, 0.12)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          overflowX: scroll?.x ? 'auto' : 'visible',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            minWidth: scroll?.x ? 'max-content' : 'auto',
          }}
        >
          <thead style={{ backgroundColor: '#f5f5f9' }}>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key || col.dataIndex || index}
                  style={{
                    padding: '12px 16px',
                    color: '#435971',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #e7e7e8',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px' }}>
                  <Spin size="large" />
                </td>
              </tr>
            ) : dataSource && dataSource.length > 0 ? (
              dataSource.map((row, rowIndex) => {
                const key = typeof rowKey === 'function' ? rowKey(row) : row[rowKey] || rowIndex;
                return (
                  <tr
                    key={key}
                    style={{
                      borderBottom: '1px solid #e7e7e8',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(105, 108, 255, 0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {columns.map((col, colIndex) => {
                      const dataIndex = col.dataIndex;
                      let text = dataIndex;
                      if (Array.isArray(dataIndex)) {
                        text = dataIndex.reduce((acc, curr) => (acc ? acc[curr] : undefined), row);
                      } else if (dataIndex) {
                        text = row[dataIndex];
                      } else {
                        text = row;
                      }

                      let renderContent = col.render ? col.render(text, row, rowIndex) : text;

                      return (
                        <td
                          key={col.key || dataIndex || colIndex}
                          style={{
                            padding: '12px 16px',
                            color: '#566a7f',
                            fontSize: '0.875rem',
                            verticalAlign: 'middle',
                          }}
                        >
                          {renderContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px', color: '#a1acb8' }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.total > 0 && (
        <div
          style={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid #e7e7e8',
          }}
        >
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

