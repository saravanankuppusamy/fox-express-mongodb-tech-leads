import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  policyNumber: { type: String, required: true, unique: true, trim: true },
  customerName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  productType: {
    type: String,
    required: true,
    enum: ['auto', 'home', 'health', 'travel']
  },
  premium: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['quoted', 'active', 'cancelled'],
    default: 'quoted'
  },
  effectiveDate: { type: Date, required: true }
}, { timestamps: true });

policySchema.virtual('displayLabel').get(function () {
  return `${this.policyNumber} - ${this.customerName} (${this.productType})`;
});

policySchema.statics.findByProduct = function (productType) {
  return this.find({ productType });
};

export default mongoose.model('Policy', policySchema);
