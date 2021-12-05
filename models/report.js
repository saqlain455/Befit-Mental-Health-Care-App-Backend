var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ReportSchema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId },
  doctorId: { type: mongoose.Schema.Types.ObjectId },
  data: {
    type: Object,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
