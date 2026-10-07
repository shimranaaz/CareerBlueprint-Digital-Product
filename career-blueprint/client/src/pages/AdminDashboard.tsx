import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faRightFromBracket,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import api from "../lib/api";

interface Order {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  amount: number;
  status: "created" | "paid" | "failed";
  emailDelivered: boolean;
  createdAt: string;
}

interface Summary {
  totalOrders: number;
  totalPaid: number;
  totalRevenue: number;
  revenueThisMonth: number;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [visits, setVisits] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [authChecked, setAuthChecked] = useState(false);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/admin/orders", {
        params: { search, status },
      });
      setOrders(data.orders);
      setSummary(data.summary);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [search, status, navigate]);

  const fetchVisits = useCallback(async () => {
    try {
      const { data } = await api.get("/api/admin/visits");
      setVisits(data.count);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/api/admin/me");
        setAuthChecked(true);
        fetchOrders();
        fetchVisits();
      } catch {
        navigate("/admin/login");
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResend = async (orderId: string) => {
    setResendingId(orderId);
    try {
      await api.post(`/api/admin/orders/${orderId}/resend`);
      await fetchOrders();
    } catch {
      alert("Failed to resend email");
    } finally {
      setResendingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/api/admin/orders/${deleteTarget._id}`);
      await fetchOrders();
    } catch {
      alert("Failed to delete order");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleLogout = async () => {
    await api.post("/api/admin/logout");
    navigate("/admin/login");
  };

  const statusStyles: Record<string, string> = {
    paid: "bg-[#E1F5EE] text-[#04342C]",
    failed: "bg-red-50 text-[#D65C4A]",
    created: "bg-amber-50 text-amber-700",
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F5F8F8] flex items-center justify-center">
        <p className="text-[#5C6B6B] text-sm">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8F8]">
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#095859]">Admin Dashboard</h1>
            <p className="text-xs text-[#5C6B6B]">Career Blueprint orders</p>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-sm text-[#5C6B6B] flex items-center gap-1.5 hover:text-[#095859] transition-colors"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Log out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-xs text-[#5C6B6B] mb-1">Total Visits</p>
              <p className="text-2xl font-bold text-[#095859]">{visits}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-xs text-[#5C6B6B] mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-[#095859]">{summary.totalOrders}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-xs text-[#5C6B6B] mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-[#095859]">{summary.totalPaid}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-xs text-[#5C6B6B] mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-[#095859]">₹{summary.totalRevenue}</p>
            </div>
            <div className="bg-[#095859] rounded-xl p-5">
              <p className="text-xs text-white/70 mb-1">This Month</p>
              <p className="text-2xl font-bold text-white">₹{summary.revenueThisMonth}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
              />
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#095859]"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#095859] bg-white"
            >
              <option value="all">All statuses</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="created">Pending</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="text-[#5C6B6B] text-xs border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Email</th>
                  <th className="text-left px-4 py-3 font-semibold">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Emailed</th>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-right px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-[#5C6B6B]">
                      Loading...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-[#5C6B6B]">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-50 hover:bg-[#F5F8F8]/60 transition-colors">
                      <td className="px-4 py-3.5 text-[#095859] font-medium">{order.name}</td>
                      <td className="px-4 py-3.5 text-[#5C6B6B]">{order.email}</td>
                      <td className="px-4 py-3.5 text-[#5C6B6B]">₹{order.amount / 100}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#5C6B6B]">
                        {order.emailDelivered ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3.5 text-[#5C6B6B] whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-4">
                          {order.status === "paid" && (
                            <button
                              onClick={() => handleResend(order._id)}
                              disabled={resendingId === order._id}
                              className="text-[#095859] text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                            >
                              <FontAwesomeIcon icon={faArrowRotateRight} />
                              {resendingId === order._id ? "Sending..." : "Resend"}
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteTarget(order)}
                            className="text-[#D65C4A] text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-[#095859] mb-2">Delete this order?</h3>
            <p className="text-sm text-[#5C6B6B] mb-6">
              This will permanently remove <span className="font-semibold">{deleteTarget.name}</span>'s
              order ({deleteTarget.email}). This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-200 text-[#5C6B6B] font-semibold rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-[#D65C4A] text-white font-semibold rounded-lg py-2.5 text-sm hover:brightness-95 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-[#095859] mb-2">Log out?</h3>
            <p className="text-sm text-[#5C6B6B] mb-6">
              You'll need to sign in again to access the admin dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 border border-gray-200 text-[#5C6B6B] font-semibold rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-[#095859] text-white font-semibold rounded-lg py-2.5 text-sm hover:bg-[#0a6b6c] transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;