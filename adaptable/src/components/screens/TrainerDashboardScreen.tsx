import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { MOCK_STUDENTS } from '../../data/trainerData';
import { StudentRecord } from '../../types';
import { GraduationCap, ArrowLeft, Search, Plus, Send, CheckCircle2, AlertCircle, Users } from 'lucide-react';

export const TrainerDashboardScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText } = useAccessibility();

  const [students, setStudents] = useState<StudentRecord[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord>(MOCK_STUDENTS[0]);
  const [taskNotice, setTaskNotice] = useState('');

  const handleAssignTask = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, assignedTasksCount: s.assignedTasksCount + 1 } : s
      )
    );
    setTaskNotice(`Assigned targeted practice module to ${selectedStudent.name}!`);
    speakText(`Assigned task to ${selectedStudent.name}`);
    setTimeout(() => setTaskNotice(''), 3000);
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${
        config.highContrast ? 'text-yellow-300' : 'text-white'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-0.5">
              <GraduationCap className="w-4 h-4" />
              <span>TRAINER PORTAL • Rehabilitation & Mentorship</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Student Cohort Analytics</h1>
          </div>
        </div>

        <div className="text-xs font-bold bg-purple-500/10 px-3.5 py-2 rounded-2xl border border-purple-500/30 text-purple-300 flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>5 Active Learners</span>
        </div>
      </div>

      {taskNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{taskNotice}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roster Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Assigned Student Roster
          </span>
          <div className="space-y-2">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => {
                  setSelectedStudent(student);
                  speakText(`Selected student ${student.name}`);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  selectedStudent.id === student.id
                    ? 'bg-purple-600/30 border-purple-500 ring-2 ring-purple-500 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                  />
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{student.name}</h3>
                    <p className="text-[10px] text-purple-300 uppercase font-bold">{student.disability} Mode</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-emerald-400">{student.communicationScore}%</div>
                  <div className="text-[10px] text-slate-500">{student.lastActive}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Student Deep Dive */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40 shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-black text-white">{selectedStudent.name}</h2>
                <p className="text-xs text-slate-400">
                  Primary Adaptive Profile:{' '}
                  <strong className="text-purple-300 uppercase">{selectedStudent.disability} Mode</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleAssignTask(selectedStudent.id)}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Assign Practice Module</span>
            </button>
          </div>

          {/* Student Performance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1">
              <div className="text-2xl font-black text-purple-400">{selectedStudent.communicationScore}%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Comm Score</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1">
              <div className="text-2xl font-black text-blue-400">{selectedStudent.interviewReadiness}%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interview Index</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1">
              <div className="text-2xl font-black text-emerald-400">{selectedStudent.lessonsCompleted}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lessons Done</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1">
              <div className="text-2xl font-black text-amber-400">{selectedStudent.assignedTasksCount}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Tasks</div>
            </div>
          </div>

          {/* Weak Area Analysis Card */}
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Trainer Insight: Primary Growth Bottleneck
            </span>
            <p className="text-sm font-bold text-white">{selectedStudent.weakArea}</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Recommend assigning Module 3 Simulator turn focusing on "{selectedStudent.weakArea}".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
