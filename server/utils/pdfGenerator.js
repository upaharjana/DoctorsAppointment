const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const generateAppointmentPDF = async (appointment, doctor, patient) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      // Buffer to store PDF
      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });

      // Generate QR code
      const qrData = JSON.stringify({
        appointmentId: appointment.appointmentId,
        patientName: patient.name,
        doctorName: doctor.userId.name,
        date: appointment.appointmentDate,
        time: `${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}`
      });
      
      const qrCodeDataUrl = await QRCode.toDataURL(qrData);

      // Header with logo placeholder and title
      doc.fontSize(24)
         .fillColor('#2563eb')
         .text('MediCare India', { align: 'center' })
         .moveDown(0.5);

      doc.fontSize(18)
         .fillColor('#1e40af')
         .text('Appointment Confirmation', { align: 'center' })
         .moveDown(1);

      // Horizontal line
      doc.moveTo(50, doc.y)
         .lineTo(545, doc.y)
         .strokeColor('#2563eb')
         .lineWidth(2)
         .stroke()
         .moveDown(1);

      // Appointment ID (prominent)
      doc.fontSize(12)
         .fillColor('#374151')
         .text('Appointment ID: ', { continued: true })
         .fontSize(14)
         .fillColor('#dc2626')
         .font('Helvetica-Bold')
         .text(appointment.appointmentId)
         .font('Helvetica')
         .moveDown(1);

      // Status badge
      let statusColor = '#22c55e';
      if (appointment.status === 'pending') statusColor = '#f59e0b';
      if (appointment.status === 'cancelled') statusColor = '#dc2626';
      if (appointment.status === 'rejected') statusColor = '#dc2626';

      doc.fontSize(11)
         .fillColor('#374151')
         .text('Status: ', { continued: true })
         .fillColor(statusColor)
         .font('Helvetica-Bold')
         .text(appointment.status.toUpperCase())
         .font('Helvetica')
         .moveDown(1.5);

      // Two column layout
      const leftColumnX = 50;
      const rightColumnX = 300;
      let currentY = doc.y;

      // Patient Information (Left Column)
      doc.fontSize(14)
         .fillColor('#1e40af')
         .font('Helvetica-Bold')
         .text('Patient Information', leftColumnX, currentY)
         .font('Helvetica')
         .moveDown(0.5);

      currentY = doc.y;
      doc.fontSize(10)
         .fillColor('#374151')
         .text(`Name: ${patient.name}`, leftColumnX, currentY)
         .text(`Email: ${patient.email}`, leftColumnX)
         .text(`Phone: ${patient.phone}`, leftColumnX);

      if (patient.gender) {
        doc.text(`Gender: ${patient.gender}`, leftColumnX);
      }

      if (patient.dateOfBirth) {
        const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
        doc.text(`Age: ${age} years`, leftColumnX);
      }

      // Doctor Information (Right Column)
      doc.fontSize(14)
         .fillColor('#1e40af')
         .font('Helvetica-Bold')
         .text('Doctor Information', rightColumnX, currentY)
         .font('Helvetica')
         .moveDown(0.5);

      currentY = doc.y;
      doc.fontSize(10)
         .fillColor('#374151')
         .text(`Name: Dr. ${doctor.userId.name}`, rightColumnX, currentY)
         .text(`Specialization: ${doctor.specialization}`, rightColumnX)
         .text(`Qualification: ${doctor.qualifications}`, rightColumnX)
         .text(`Experience: ${doctor.experience} years`, rightColumnX)
         .text(`Phone: ${doctor.userId.phone}`, rightColumnX);

      doc.moveDown(2);

      // Appointment Details Section
      currentY = doc.y;
      doc.fontSize(14)
         .fillColor('#1e40af')
         .font('Helvetica-Bold')
         .text('Appointment Details', leftColumnX, currentY)
         .font('Helvetica')
         .moveDown(0.5);

      const appointmentDateObj = new Date(appointment.appointmentDate);
      const formattedDate = appointmentDateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      currentY = doc.y;
      doc.fontSize(10)
         .fillColor('#374151')
         .text(`Date: ${formattedDate}`, leftColumnX, currentY)
         .text(`Time: ${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}`, leftColumnX)
         .text(`Consultation Fee: ₹${doctor.consultationFee}`, leftColumnX);

      if (appointment.reasonForVisit) {
        doc.moveDown(0.5)
           .text(`Reason for Visit: ${appointment.reasonForVisit}`, leftColumnX, doc.y, {
             width: 450
           });
      }

      doc.moveDown(1.5);

      // Clinic Address
      currentY = doc.y;
      doc.fontSize(14)
         .fillColor('#1e40af')
         .font('Helvetica-Bold')
         .text('Clinic Address', leftColumnX, currentY)
         .font('Helvetica')
         .moveDown(0.5);

      currentY = doc.y;
      if (doctor.clinicAddress && doctor.clinicAddress.fullAddress) {
        doc.fontSize(10)
           .fillColor('#374151')
           .text(doctor.clinicAddress.fullAddress, leftColumnX, currentY, { width: 350 });
      } else if (doctor.clinicAddress) {
        const addr = doctor.clinicAddress;
        doc.fontSize(10)
           .fillColor('#374151')
           .text(`${addr.street || ''}`, leftColumnX, currentY)
           .text(`${addr.city || ''}, ${addr.state || ''} ${addr.zipCode || ''}`, leftColumnX);
      } else {
        doc.fontSize(10)
           .fillColor('#374151')
           .text('Clinic address not available', leftColumnX, currentY);
      }

      // QR Code (Bottom Right)
      const qrSize = 100;
      const qrX = 445;
      const qrY = currentY;

      doc.image(qrCodeDataUrl, qrX, qrY, {
        width: qrSize,
        height: qrSize
      });

      doc.fontSize(8)
         .fillColor('#6b7280')
         .text('Scan for verification', qrX + 10, qrY + qrSize + 5);

      // Footer
      const footerY = 750;
      doc.moveTo(50, footerY)
         .lineTo(545, footerY)
         .strokeColor('#e5e7eb')
         .lineWidth(1)
         .stroke();

      doc.fontSize(8)
         .fillColor('#6b7280')
         .text('Important: Please arrive 15 minutes before your appointment time.', 50, footerY + 10, {
           width: 495,
           align: 'center'
         })
         .text('For any queries or rescheduling, please contact the clinic.', 50, footerY + 25, {
           width: 495,
           align: 'center'
         })
         .text(`Generated on: ${new Date().toLocaleString()}`, 50, footerY + 40, {
           width: 495,
           align: 'center'
         });

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateAppointmentPDF };
