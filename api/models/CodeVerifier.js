import mongoose from 'mongoose';

const codeVerifierSchema = new mongoose.Schema({
    codeVerifier: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 10*60*1000), // 10 minutes from creation
        index: { expires: '10m' } // Delete after 10 minutes
    }
}, {
    timestamps: true
});

const CodeVerifier = mongoose.model('CodeVerifier', codeVerifierSchema);

export default CodeVerifier;