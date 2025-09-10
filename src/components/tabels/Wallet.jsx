import React, { useEffect, useState } from 'react';
import {
  Search,
  Users,
  Clock,
  Eye,
  Lock,
  Unlock,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getWalletTransactions } from '../../redux/slices/walletSlice';

const WalletTable = () => {
  const [activeTab, setActiveTab] = useState('credit');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLockModal, setShowLockModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [lockAmount, setLockAmount] = useState('');
  const [releaseAmount, setReleaseAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()

  useEffect(() => { dispatch(getWalletTransactions({ trnType: "Verified" })) }, [dispatch])

  // Sample data
  const transactions = [
    { id: 1, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'WALLET-CREDIT', txnType: 'CREDIT', amount: 100, opening: 0, closing: 100, remark: 'Your wallet has been credited the sum of 100', txnId: 'WC5767316689', timestamp: '2025-07-10 19:19:34' },
    { id: 2, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'WALLET-CREDIT', txnType: 'CREDIT', amount: 500, opening: 100, closing: 600, remark: 'Your wallet has been credited the sum of 500', txnId: 'WC4207672548', timestamp: '2025-07-16 15:44:14' },
    { id: 3, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE', txnType: 'DEBIT', amount: 349, opening: 600, closing: 251, remark: 'Your wallet has been debited the sum of 349', txnId: 'REC71082065', timestamp: '2025-07-16 15:44:47' },
    { id: 4, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE-COMMISSION', txnType: 'CREDIT', amount: 0, opening: 251, closing: 251, remark: 'Your wallet has been credited the sum of 0', txnId: 'REC71082065', timestamp: '2025-07-16 15:44:50' },
    { id: 5, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE', txnType: 'DEBIT', amount: 29, opening: 251, closing: 222, remark: 'Your wallet has been debited the sum of 29', txnId: 'REC71082065', timestamp: '2025-07-16 15:45:50' },
    { id: 6, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE-COMMISSION', txnType: 'CREDIT', amount: 0, opening: 222, closing: 222, remark: 'Your wallet has been credited the sum of 0', txnId: 'REC71082065', timestamp: '2025-07-16 15:45:54' },
    { id: 7, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'WALLET-CREDIT', txnType: 'CREDIT', amount: 1000000, opening: 222, closing: 1000222, remark: 'Your wallet has been credited the sum of 1000000', txnId: 'WC2206120602', timestamp: '2025-07-17 12:50:30' },
    { id: 8, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE', txnType: 'DEBIT', amount: 349, opening: 1000222, closing: 999873, remark: 'Your wallet has been debited the sum of 349', txnId: 'REC71082065', timestamp: '2025-07-17 12:50:52' },
    { id: 9, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE-COMMISSION', txnType: 'CREDIT', amount: 0, opening: 999873, closing: 999873, remark: 'Your wallet has been credited the sum of 0', txnId: 'REC71082065', timestamp: '2025-07-17 12:50:56' },
    { id: 10, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', type: 'RECHARGE', txnType: 'DEBIT', amount: 899, opening: 999873, closing: 998974, remark: 'Your wallet has been debited the sum of 899', txnId: 'REC71082065', timestamp: '2025-07-17 12:51:21' }
  ];

  const creditWalletUsers = [
    { id: 1, name: 'harmeek Singh', username: 'AZU3158358586', phone: '7896541236', email: 'harmeek@gmail.com', wallet: 996152 },
    { id: 2, name: 'Navindra Singh', username: 'AZU9578552905', phone: '7300389828', email: 'navindra@ecuzen.com', wallet: 1100 },
    { id: 3, name: 'aroo', username: 'AZU4300308573', phone: '1234567895', email: 'arbazkhan098267@gmail.com', wallet: 0 },
    { id: 4, name: 'retailer', username: 'AZU9480321564', phone: '1234567891', email: 'arbazkhan0927@gmail.com', wallet: 0 }
  ];

  const debitWalletUsers = [...creditWalletUsers];

  const pendingTopupRequests = [
    { id: 1, name: 'Navindra Singh', username: 'AZU9578552905', phone: '7300389828', account: '34621114254', ifsc: 'SBIN0004655', bank: 'SBIN', amount: 2111, txnId: 'AZU1926244929T', rrn: '11', txnDate: '2025-09-03' },
    { id: 2, name: 'Navindra Singh', username: 'AZU9578552905', phone: '7300389828', account: '34621114254', ifsc: 'SBIN0004655', bank: 'SBIN', amount: 100, txnId: 'AZU3899322085T', rrn: '10', txnDate: '2025-09-03' }
  ];

  const allTopupRequests = [
    ...pendingTopupRequests,
    { id: 3, name: 'Navindra Singh', username: 'AZU9578552905', phone: '7300389828', account: '34621114254', ifsc: 'SBIN0004655', bank: 'SBIN', amount: 100, txnId: 'AZU9186009400T', rrn: '1', txnDate: '2025-09-03', status: 'Approved' },
    { id: 4, name: 'Navindra Singh', username: 'AZU9578552905', phone: '7300389828', account: '34621114254', ifsc: 'SBIN0004655', bank: 'SBIN', amount: 1000, txnId: 'AZU4897923988T', rrn: '13', txnDate: '2025-09-03', status: 'Approved' }
  ];

  const filteredTransactions = transactions.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone.includes(searchTerm)
  );

  const filteredCreditUsers = creditWalletUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDebitUsers = debitWalletUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPendingRequests = pendingTopupRequests.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const filteredAllRequests = allTopupRequests.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const getStatusColor = (type, status) => {
    if (status === 'Approved') return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    if (type === 'CREDIT') return 'bg-blue-100 text-blue-800 border border-blue-200';
    if (type === 'DEBIT') return 'bg-red-100 text-red-800 border border-red-200';
    return 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'WALLET-CREDIT':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'RECHARGE':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'RECHARGE-COMMISSION':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const handleLockWallet = () => {
    if (!selectedUser || !lockAmount) {
      alert('Please fill all required fields');
      return;
    }
    console.log('Locking wallet:', { selectedUser, lockAmount });
    alert('Wallet locked successfully!');
    setShowLockModal(false);
    setSelectedUser('');
    setLockAmount('');
  };

  const handleReleaseAmount = () => {
    if (!selectedUser || !releaseAmount) {
      alert('Please fill all required fields');
      return;
    }
    console.log('Releasing amount:', { selectedUser, releaseAmount });
    alert('Amount released successfully!');
    setShowReleaseModal(false);
    setSelectedUser('');
    setReleaseAmount('');
  };

  const handleApproveRequest = (requestId) => {
    console.log('Approving request:', requestId);
    alert('Request approved successfully!');
  };

  const handleRejectRequest = (requestId) => {
    console.log('Rejecting request:', requestId);
    alert('Request rejected successfully!');
  };

  const handleViewProof = (requestId) => {
    console.log('Viewing proof for request:', requestId);
    alert('Opening proof document...');
  };

  const handleCreditWallet = (userId) => {
    const amount = prompt('Enter credit amount:');
    if (amount) {
      console.log('Crediting wallet:', { userId, amount });
      alert(`₹${amount} credited successfully!`);
    }
  };

  const handleDebitWallet = (userId) => {
    const amount = prompt('Enter debit amount:');
    if (amount) {
      console.log('Debiting wallet:', { userId, amount });
      alert(`₹${amount} debited successfully!`);
    }
  };

  // Stats data
  const stats = [
    { name: 'Total Balance', value: '₹12,45,678', change: '+2.5%', icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { name: 'Today\'s Transactions', value: '156', change: '+12%', icon: TrendingUp, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Pending Requests', value: '23', change: '-5%', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { name: 'Active Users', value: '1,234', change: '+8%', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  return (
    <div className="space-y-8">
      <div className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change} from yesterday
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20">
            <nav className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'credit', label: 'Credit Wallet', icon: Plus },
                { id: 'debit', label: 'Debit Wallet', icon: Minus },
                { id: 'pending', label: 'Pending Topup', icon: Clock },
                { id: 'all', label: 'All Topup Requests', icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users, transactions, or IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-xl bg-white/70 backdrop-blur-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/80 transition-all duration-300 shadow-md">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* {activeTab === 'transactions' && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
                    <p className="text-gray-600 mt-1">Pending Payout Account transactions</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {filteredTransactions.length} of {transactions.length} transactions
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/30">
                  <thead className="bg-gray-50/50">
                    <tr>
                      {['#', 'Name', 'User Name', 'Phone', 'Type', 'Txn Type', 'Remark', 'Txn Id', 'Amount', 'Opening', 'Closing', 'Time stamp'].map((header) => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 divide-y divide-gray-200/20">
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={transaction.id} className="hover:bg-white/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{transaction.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.txnType)}`}>
                            {transaction.txnType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={transaction.remark}>
                          {transaction.remark}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{transaction.txnId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{transaction.opening.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{transaction.closing.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Showing 1 to 10 of 41 entries</p>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          currentPage === page 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {(activeTab === 'credit' || activeTab === 'debit') && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-emerald-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {activeTab === 'credit' ? 'Credit Wallet' : 'Debit Wallet'} Management
                    </h2>
                    <p className="text-gray-600 mt-1">Manage user wallet balances</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowLockModal(true)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Lock Wallet</span>
                    </button>
                    <button
                      onClick={() => setShowReleaseModal(true)}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg"
                    >
                      <Unlock className="h-4 w-4" />
                      <span>Release Amount</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/30">
                  <thead className="bg-gray-50/50">
                    <tr>
                      {['#', 'Name', 'User Name', 'Phone', 'Email', 'Wallet', 'Action'].map((header) => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 divide-y divide-gray-200/20">
                    {(activeTab === 'credit' ? filteredCreditUsers : filteredDebitUsers).map((user, index) => (
                      <tr key={user.id} className="hover:bg-white/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{user.wallet.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => activeTab === 'credit' ? handleCreditWallet(user.id) : handleDebitWallet(user.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 shadow-md ${activeTab === 'credit'
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
                              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                              }`}
                          >
                            {activeTab === 'credit' ? 'Credit' : 'Debit'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Showing 1 to 4 of 4 entries</p>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1" disabled>
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
                    <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1" disabled>
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'pending' || activeTab === 'all') && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {activeTab === 'pending' ? 'Pending Topup Requests' : 'All Topup Requests'}
                    </h2>
                    <p className="text-gray-600 mt-1">Review and manage topup requests</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {activeTab === 'pending' ? filteredPendingRequests.length : filteredAllRequests.length} requests
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/30">
                  <thead className="bg-gray-50/50">
                    <tr>
                      {['#', 'Name', 'User Name', 'Phone', 'Account', 'IFSC', 'Bank', 'Amount', 'Txn Id', 'RRN', 'Txn Date', 'Action'].map((header) => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 divide-y divide-gray-200/20">
                    {(activeTab === 'pending' ? filteredPendingRequests : filteredAllRequests).map((request, index) => (
                      <tr key={request.id} className="hover:bg-white/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{request.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{request.account}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.ifsc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.bank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{request.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{request.txnId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.rrn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.txnDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.status === 'Approved' ? (
                            <div className="flex items-center space-x-2">
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Approved
                              </span>
                              <button
                                onClick={() => handleViewProof(request.id)}
                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View Proof"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleApproveRequest(request.id)}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectRequest(request.id)}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-sm"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleViewProof(request.id)}
                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View Proof"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">
                    Showing 1 to {activeTab === 'pending' ? pendingTopupRequests.length : allTopupRequests.length} of {activeTab === 'pending' ? pendingTopupRequests.length : allTopupRequests.length} entries
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1" disabled>
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
                    <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1" disabled>
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lock Wallet Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Lock User Wallet</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  >
                    <option value="">Choose a user...</option>
                    <option value="harmeek Singh 7896541236(AZU3158358586)">harmeek Singh 7896541236 (AZU3158358586)</option>
                    <option value="Navindra Singh 7300389828(AZU9578552905)">Navindra Singh 7300389828 (AZU9578552905)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Amount</label>
                  <input
                    type="text"
                    value="996152"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lock Amount</label>
                  <input
                    type="number"
                    value={lockAmount}
                    onChange={(e) => setLockAmount(e.target.value)}
                    placeholder="Enter amount to lock"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowLockModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLockWallet}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg font-medium"
                >
                  Lock Amount
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Release Amount Modal */}
      {showReleaseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                  <Unlock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Release Lock Amount</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  >
                    <option value="">Choose a user...</option>
                    <option value="harmeek Singh 7896541236(AZU3158358586)">harmeek Singh 7896541236 (AZU3158358586)</option>
                    <option value="Navindra Singh 7300389828(AZU9578552905)">Navindra Singh 7300389828 (AZU9578552905)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lock Amount</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 shadow-sm"
                    placeholder="Lock amount will appear here"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Release Amount</label>
                  <input
                    type="number"
                    value={releaseAmount}
                    onChange={(e) => setReleaseAmount(e.target.value)}
                    placeholder="Enter amount to release"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowReleaseModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReleaseAmount}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg font-medium"
                >
                  Release Amount
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification (you can add this for better UX) */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        {/* Toast messages would go here */}
      </div>
    </div>
  );
};

export default WalletTable;