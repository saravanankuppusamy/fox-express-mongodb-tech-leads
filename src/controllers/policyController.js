import Policy from '../models/Policy.js';

export async function listPolicies(req, res) {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const query = {};
  if (req.query.productType) query.productType = req.query.productType;
  if (req.query.status) query.status = req.query.status;
  if (req.query.cursor) query._id = { $gt: req.query.cursor };

  const policies = await Policy.find(query)
    .select('-__v')
    .sort({ _id: 1 })
    .limit(limit + 1);

  const hasMore = policies.length > limit;
  if (hasMore) policies.pop();
  const nextCursor = hasMore ? policies.at(-1)._id : null;
  res.json({ policies, nextCursor, hasMore });
}

export async function getPolicy(req, res) {
  const policy = await Policy.findById(req.params.id).select('-__v');
  if (!policy) return res.status(404).json({ error: 'Policy not found' });
  res.json(policy);
}

export async function createPolicy(req, res) {
  const { policyNumber, customerName, email, productType, premium, status, effectiveDate } = req.body;
  const policy = await Policy.create({ policyNumber, customerName, email, productType, premium, status, effectiveDate });
  res.status(201).json(policy);
}

export async function updatePolicy(req, res) {
  const allowed = ['customerName', 'email', 'productType', 'premium', 'status', 'effectiveDate'];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const policy = await Policy.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!policy) return res.status(404).json({ error: 'Policy not found' });
  res.json(policy);
}

export async function deletePolicy(req, res) {
  const policy = await Policy.findByIdAndDelete(req.params.id);
  if (!policy) return res.status(404).json({ error: 'Policy not found' });
  res.status(204).end();
}
