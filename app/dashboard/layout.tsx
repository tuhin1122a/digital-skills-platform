"use client"

import React, { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>

          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </PersistGate>
    </Provider>
  )
}
