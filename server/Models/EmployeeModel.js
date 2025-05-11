import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
},{timestamps: true});
const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
// // export default mongoose.model("Employee", employeeSchema);
// // import mongoose from 'mongoose';