"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  ValidationModule,
  createGrid,
} from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  // ClientSideRowModelModule,
  ValidationModule /* Development Only */,
  AllEnterpriseModule,
]);

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "athlete", headerName: "The full Name of the athlete" },
    {
      field: "age",
      headerName: "The number of Years since the athlete was born",
      initialWidth: 120,
    },
    {
      field: "country",
      headerName:
        "The Country the athlete was born in, The Country the athlete was born in The Country the athlete was born in",
    },
    { field: "sport", headerName: "The Sport the athlete participated in" },
    {
      field: "total",
      headerName: "The Total number of medals won by the athlete",
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      minWidth: 150,
      flex: 1,
      wrapHeaderText: true,
      autoHeight: true,
      autoHeaderHeight: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={rowData}
          sideBar={{ toolPanels: ["columns", "filters"] }}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GridExample />
  </StrictMode>
);
