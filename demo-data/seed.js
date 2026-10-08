import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import Policy from '../src/models/Policy.js';

await connectDB();
await Policy.deleteMany({});
await Policy.insertMany([
  { policyNumber:'FOX-AUTO-1001', customerName:'Asha Raman', email:'asha@example.com', productType:'auto', premium:1280, status:'active', effectiveDate:'2026-01-15' },
  { policyNumber:'FOX-HOME-2001', customerName:'Daniel Lee', email:'daniel@example.com', productType:'home', premium:1850, status:'active', effectiveDate:'2026-02-01' },
  { policyNumber:'FOX-TRAVEL-3001', customerName:'Maya Patel', email:'maya@example.com', productType:'travel', premium:240, status:'quoted', effectiveDate:'2026-11-20' },
  { policyNumber:'FOX-HEALTH-4001', customerName:'Jordan Smith', email:'jordan@example.com', productType:'health', premium:5400, status:'active', effectiveDate:'2026-01-01' }
]);
console.log('Seeded Fox Insurance policies');
await mongoose.connection.close();
