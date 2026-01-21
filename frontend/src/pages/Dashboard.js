import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTaskStatus } from '../features/taskSlice'; 
import { setLogout } from '../features/authSlice';
import API from '../api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(''); // Date state
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth); // User info-ah Redux-la irunthu edukuroam

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredItems = items.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const progress = items.length > 0 ? Math.round((items.filter(t => t.status === 'Completed').length / items.length) * 100) : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Title kooda Date matrum Priority-ah sethu store pannuroam
    const fullTitle = `${title} [${priority}] ${dueDate ? `| Due: ${dueDate}` : ''}`;
    dispatch(addTask({ title: fullTitle, status: 'Todo' }));
    setTitle('');
    setDueDate('');
  };

  const theme = darkMode ? darkStyles : lightStyles;

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg }}>
      {/* Header with User Name */}
      <div style={styles.header}>
        <div>
          <h2 style={{ ...styles.logo, color: theme.text }}>Medify <span style={{color: '#4318FF'}}>Pro</span></h2>
          <p style={{ color: theme.text, fontSize: '14px', marginTop: '5px' }}>
            Welcome back, <span style={{ fontWeight: 'bold', color: '#4318FF' }}>{user?.name || 'User'}</span> 👋
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setDarkMode(!darkMode)} style={styles.themeBtn}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={() => dispatch(setLogout())} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.mainGrid}>
        {/* Analytics & Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg }}>
            <h3 style={{ ...styles.cardTitle, color: theme.text }}>Analytics</h3>
            <div style={{ width: '180px', margin: '10px auto' }}>
              <Pie data={{
                labels: ['Todo', 'Progress', 'Done'],
                datasets: [{
                  data: [
                    items.filter(t => t.status === 'Todo').length,
                    items.filter(t => t.status === 'In Progress').length,
                    items.filter(t => t.status === 'Completed').length
                  ],
                  backgroundColor: ['#FF6B6B', '#4D96FF', '#6BCB77'],
                  borderWidth: 0,
                }]
              }} options={{ plugins: { legend: { labels: { color: theme.text, font: { size: 10 } } } } }} />
            </div>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg }}>
            <h3 style={{ ...styles.cardTitle, color: theme.text }}>Progress ({progress}%)</h3>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Task Manager */}
        <div style={{ ...styles.card, flex: 2, backgroundColor: theme.cardBg }}>
          <div style={styles.taskHeader}>
            <h3 style={{ ...styles.cardTitle, color: theme.text }}>My Tasks</h3>
            <input 
              placeholder="Search..." 
              style={styles.searchBar}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <form onSubmit={handleAdd} style={styles.addForm}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <input 
                style={styles.input} 
                placeholder="What needs to be done?" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="date" 
                  style={styles.datePicker} 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <select style={styles.prioritySelect} onChange={(e) => setPriority(e.target.value)}>
                   <option value="High">🔴 High</option>
                   <option value="Medium" selected>🟡 Medium</option>
                   <option value="Low">🟢 Low</option>
                </select>
                <button type="submit" style={styles.addBtn}>Add Task</button>
              </div>
            </div>
          </form>

          <div style={styles.taskList}>
            {filteredItems.map(task => (
              <div key={task.id} style={{ ...styles.taskItem, borderBottom: `1px solid ${theme.border}` }}>
                <div style={{ flex: 1 }}>
                   <span style={{ fontWeight: '600', color: theme.text }}>{task.title}</span>
                   <div style={{ fontSize: '11px', color: '#4D96FF', marginTop: '4px' }}>Status: {task.status}</div>
                </div>
                <div style={styles.actions}>
                   <button onClick={async () => { await API.delete(`/tasks/${task.id}`); dispatch(fetchTasks()); }} style={styles.iconBtn}>🗑️</button>
                   {task.status !== 'Completed' && (
                     <button onClick={() => dispatch(updateTaskStatus({ id: task.id, status: task.status === 'Todo' ? 'In Progress' : 'Completed' }))} style={styles.nextBtn}>→</button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const lightStyles = { bg: '#F4F7FE', text: '#1B2559', cardBg: '#fff', border: '#F4F7FE' };
const darkStyles = { bg: '#0B1437', text: '#fff', cardBg: '#111C44', border: '#1B254B' };

const styles = {
  container: { padding: '40px', minHeight: '100vh', transition: '0.3s', fontFamily: "'DM Sans', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'flex-start' },
  logo: { fontSize: '26px', fontWeight: 'bold', margin: 0 },
  themeBtn: { padding: '8px 15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  mainGrid: { display: 'flex', gap: '25px' },
  card: { padding: '25px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' },
  cardTitle: { fontSize: '18px', fontWeight: '700', margin: '0 0 15px 0' },
  progressBarContainer: { width: '100%', height: '8px', backgroundColor: '#E0E5F2', borderRadius: '4px' },
  progressBar: { height: '100%', backgroundColor: '#4318FF', borderRadius: '4px', transition: '0.5s' },
  taskHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' },
  searchBar: { padding: '8px 12px', borderRadius: '10px', border: '1px solid #E0E5F2', fontSize: '13px' },
  addForm: { backgroundColor: 'rgba(67, 24, 255, 0.03)', padding: '15px', borderRadius: '15px', marginBottom: '20px' },
  input: { border: 'none', background: 'none', outline: 'none', fontSize: '15px', width: '100%', padding: '5px' },
  datePicker: { padding: '5px', borderRadius: '8px', border: '1px solid #E0E5F2', fontSize: '12px' },
  prioritySelect: { border: 'none', background: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' },
  addBtn: { padding: '8px 15px', backgroundColor: '#4318FF', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginLeft: 'auto' },
  taskList: { maxHeight: '350px', overflowY: 'auto' },
  taskItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', alignItems: 'center' },
  nextBtn: { padding: '4px 10px', backgroundColor: '#4318FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' },
  logoutBtn: { padding: '10px 20px', borderRadius: '12px', border: 'none', backgroundColor: '#FF5B5B', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }
};

export default Dashboard;