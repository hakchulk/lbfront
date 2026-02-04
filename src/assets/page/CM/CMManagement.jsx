import React from "react";
import { Route, Routes } from "react-router-dom";
import CMopen from "./CMopen";
import CMjoinlist from "./CMjoinlist";
import Noticemanagement from "./Noticemanagement";

function CMManagementMain() {
  return (
    <>
      <h2>CMManagement</h2>
    </>
  );
}

function CMManagement() {
  return (
    <Routes>
      <Route path="/" element={<CMManagementMain />} />
      <Route path="cmopen" element={<CMopen />} />
      <Route path="cmjoinlist" element={<CMjoinlist />} />
      <Route path="noticemanagement/*" element={<Noticemanagement />} />
    </Routes>
  );
}

export default CMManagement;
