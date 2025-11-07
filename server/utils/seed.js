require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '+91-9830012345',
      role: 'admin'
    });

    // Create patient users
    console.log('Creating patient users...');
    const patients = await User.create([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: 'patient123',
        phone: '+91-9830098301',
        role: 'patient',
        gender: 'male',
        dateOfBirth: new Date('1990-05-15'),
        address: {
          street: '23/1A Park Street',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700016'
        }
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'patient123',
        phone: '+91-9830098302',
        role: 'patient',
        gender: 'female',
        dateOfBirth: new Date('1985-08-22'),
        address: {
          street: '45 Ballygunge Circular Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700019'
        }
      },
      {
        name: 'Amit Chatterjee',
        email: 'amit@example.com',
        password: 'patient123',
        phone: '+91-9830098303',
        role: 'patient',
        gender: 'male',
        dateOfBirth: new Date('1995-03-10'),
        address: {
          street: '12 Salt Lake Sector V',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700091'
        }
      },
      {
        name: 'Sneha Das',
        email: 'sneha@example.com',
        password: 'patient123',
        phone: '+91-9830098304',
        role: 'patient',
        gender: 'female',
        dateOfBirth: new Date('1992-11-28'),
        address: {
          street: '67 Southern Avenue',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700029'
        }
      }
    ]);

    // Create doctor users
    console.log('Creating doctor users...');
    const doctorUsers = await User.create([
      {
        name: 'Dr. Ananya Mukherjee',
        email: 'ananya.mukherjee@example.com',
        password: 'doctor123',
        phone: '+91-9830012301',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Rajiv Banerjee',
        email: 'rajiv.banerjee@example.com',
        password: 'doctor123',
        phone: '+91-9830012302',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Priyanka Sen',
        email: 'priyanka.sen@example.com',
        password: 'doctor123',
        phone: '+91-9830012303',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Amit Ghosh',
        email: 'amit.ghosh@example.com',
        password: 'doctor123',
        phone: '+91-9830012304',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Sunita Sharma',
        email: 'sunita.sharma@example.com',
        password: 'doctor123',
        phone: '+91-9830012305',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Vikram Malhotra',
        email: 'vikram.malhotra@example.com',
        password: 'doctor123',
        phone: '+91-9830012306',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Kavita Roy',
        email: 'kavita.roy@example.com',
        password: 'doctor123',
        phone: '+91-9830012307',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Sanjay Bose',
        email: 'sanjay.bose@example.com',
        password: 'doctor123',
        phone: '+91-9830012308',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Meera Chakraborty',
        email: 'meera.chakraborty@example.com',
        password: 'doctor123',
        phone: '+91-9830012309',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Arun Das',
        email: 'arun.das@example.com',
        password: 'doctor123',
        phone: '+91-9830012310',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Ritu Kapoor',
        email: 'ritu.kapoor@example.com',
        password: 'doctor123',
        phone: '+91-9830012311',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Soumya Dutta',
        email: 'soumya.dutta@example.com',
        password: 'doctor123',
        phone: '+91-9830012312',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Karan Verma',
        email: 'karan.verma@example.com',
        password: 'doctor123',
        phone: '+91-9830012313',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Nisha Gupta',
        email: 'nisha.gupta@example.com',
        password: 'doctor123',
        phone: '+91-9830012314',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Rahul Chatterjee',
        email: 'rahul.chatterjee@example.com',
        password: 'doctor123',
        phone: '+91-9830012315',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Deepa Mishra',
        email: 'deepa.mishra@example.com',
        password: 'doctor123',
        phone: '+91-9830012316',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Arjun Saxena',
        email: 'arjun.saxena@example.com',
        password: 'doctor123',
        phone: '+91-9830012317',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Pooja Mehta',
        email: 'pooja.mehta@example.com',
        password: 'doctor123',
        phone: '+91-9830012318',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Suresh Iyer',
        email: 'suresh.iyer@example.com',
        password: 'doctor123',
        phone: '+91-9830012319',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Anjali Reddy',
        email: 'anjali.reddy@example.com',
        password: 'doctor123',
        phone: '+91-9830012320',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Ramesh Nair',
        email: 'ramesh.nair@example.com',
        password: 'doctor123',
        phone: '+91-9830012321',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Swati Desai',
        email: 'swati.desai@example.com',
        password: 'doctor123',
        phone: '+91-9830012322',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Manoj Kumar',
        email: 'manoj.kumar@example.com',
        password: 'doctor123',
        phone: '+91-9830012323',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Rekha Joshi',
        email: 'rekha.joshi@example.com',
        password: 'doctor123',
        phone: '+91-9830012324',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Vivek Pandey',
        email: 'vivek.pandey@example.com',
        password: 'doctor123',
        phone: '+91-9830012325',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Neha Agarwal',
        email: 'neha.agarwal@example.com',
        password: 'doctor123',
        phone: '+91-9830012326',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Siddharth Rao',
        email: 'siddharth.rao@example.com',
        password: 'doctor123',
        phone: '+91-9830012327',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Tanvi Bhatt',
        email: 'tanvi.bhatt@example.com',
        password: 'doctor123',
        phone: '+91-9830012328',
        role: 'doctor',
        gender: 'female'
      },
      {
        name: 'Dr. Ashok Singh',
        email: 'ashok.singh@example.com',
        password: 'doctor123',
        phone: '+91-9830012329',
        role: 'doctor',
        gender: 'male'
      },
      {
        name: 'Dr. Pallavi Sinha',
        email: 'pallavi.sinha@example.com',
        password: 'doctor123',
        phone: '+91-9830012330',
        role: 'doctor',
        gender: 'female'
      }
    ]);

    // Create doctor profiles
    console.log('Creating doctor profiles...');
    const doctors = await Doctor.create([
      {
        userId: doctorUsers[0]._id,
        specialization: 'Cardiologist',
        qualifications: 'MBBS, MD (Cardiology), DM (Cardiology)',
        experience: 15,
        consultationFee: 800,
        about: 'Senior cardiologist with expertise in interventional cardiology and heart disease management. Trained at AIIMS Delhi.',
        clinicAddress: {
          street: '14/2A Park Street',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700016',
          fullAddress: '14/2A Park Street, Kolkata, West Bengal 700016'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Friday', startTime: '10:00', endTime: '14:00', slotDuration: 30 }
        ],
        rating: 4.8,
        totalReviews: 234,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[1]._id,
        specialization: 'Dermatologist',
        qualifications: 'MBBS, MD (Dermatology), Fellowship in Cosmetic Dermatology',
        experience: 12,
        consultationFee: 600,
        about: 'Expert in treating skin, hair, and nail disorders. Specializes in cosmetic dermatology and laser treatments.',
        clinicAddress: {
          street: '45 Ballygunge Circular Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700019',
          fullAddress: '45 Ballygunge Circular Road, Kolkata, West Bengal 700019'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '11:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '11:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '09:00', endTime: '13:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 189,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[2]._id,
        specialization: 'Pediatrician',
        qualifications: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
        experience: 10,
        consultationFee: 500,
        about: 'Dedicated child specialist providing comprehensive pediatric care from newborns to adolescents. Expert in vaccination and growth monitoring.',
        clinicAddress: {
          street: '23 Southern Avenue',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700029',
          fullAddress: '23 Southern Avenue, Kolkata, West Bengal 700029'
        },
        availableSlots: [
          { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 20 },
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00', slotDuration: 20 },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 20 },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00', slotDuration: 20 }
        ],
        rating: 4.9,
        totalReviews: 312,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[3]._id,
        specialization: 'Orthopedic',
        qualifications: 'MBBS, MS (Orthopedics), Fellowship in Joint Replacement',
        experience: 18,
        consultationFee: 900,
        about: 'Orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery. Trained in advanced arthroscopy.',
        clinicAddress: {
          street: '67 Rashbehari Avenue',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700029',
          fullAddress: '67 Rashbehari Avenue, Kolkata, West Bengal 700029'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Wednesday', startTime: '10:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Friday', startTime: '10:00', endTime: '16:00', slotDuration: 45 }
        ],
        rating: 4.8,
        totalReviews: 167,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[4]._id,
        specialization: 'General Physician',
        qualifications: 'MBBS, MD (Internal Medicine)',
        experience: 8,
        consultationFee: 400,
        about: 'General physician providing primary healthcare for all age groups. Expertise in managing chronic diseases like diabetes and hypertension.',
        clinicAddress: {
          street: '89 Salt Lake Sector III',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700106',
          fullAddress: '89 Salt Lake Sector III, Kolkata, West Bengal 700106'
        },
        availableSlots: [
          { day: 'Monday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Tuesday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Wednesday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Thursday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Friday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Saturday', startTime: '08:00', endTime: '14:00', slotDuration: 15 }
        ],
        rating: 4.6,
        totalReviews: 445,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[5]._id,
        specialization: 'Gynecologist',
        qualifications: 'MBBS, MS (Obstetrics & Gynecology), Fellowship in Infertility',
        experience: 14,
        consultationFee: 700,
        about: 'Women\'s health specialist with expertise in high-risk pregnancy, infertility treatment, and gynecological surgeries.',
        clinicAddress: {
          street: '34 Elgin Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700020',
          fullAddress: '34 Elgin Road, Kolkata, West Bengal 700020'
        },
        availableSlots: [
          { day: 'Monday', startTime: '11:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '11:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Friday', startTime: '11:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '10:00', endTime: '14:00', slotDuration: 30 }
        ],
        rating: 4.9,
        totalReviews: 278,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[6]._id,
        specialization: 'Diabetologist',
        qualifications: 'MBBS, MD (Medicine), DM (Endocrinology)',
        experience: 11,
        consultationFee: 650,
        about: 'Diabetes specialist with expertise in managing Type 1, Type 2 diabetes, and thyroid disorders. Focus on preventive care.',
        clinicAddress: {
          street: '56 Gariahat Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700019',
          fullAddress: '56 Gariahat Road, Kolkata, West Bengal 700019'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '09:00', endTime: '13:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 201,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[7]._id,
        specialization: 'ENT Specialist',
        qualifications: 'MBBS, MS (ENT), Fellowship in Rhinology',
        experience: 9,
        consultationFee: 550,
        about: 'ENT surgeon specializing in ear, nose, throat disorders, and endoscopic sinus surgery. Expert in hearing problems and voice disorders.',
        clinicAddress: {
          street: '78 AJC Bose Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '78 AJC Bose Road, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Friday', startTime: '10:00', endTime: '18:00', slotDuration: 30 }
        ],
        rating: 4.6,
        totalReviews: 156,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[8]._id,
        specialization: 'Neurologist',
        qualifications: 'MBBS, MD (Medicine), DM (Neurology)',
        experience: 16,
        consultationFee: 850,
        about: 'Neurologist specializing in stroke, epilepsy, Parkinson\'s disease, and headache disorders. Expert in neuro-diagnostic procedures.',
        clinicAddress: {
          street: '12 Camac Street',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '12 Camac Street, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '11:00', endTime: '17:00', slotDuration: 45 },
          { day: 'Thursday', startTime: '11:00', endTime: '17:00', slotDuration: 45 },
          { day: 'Saturday', startTime: '10:00', endTime: '14:00', slotDuration: 45 }
        ],
        rating: 4.8,
        totalReviews: 193,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[9]._id,
        specialization: 'Gastroenterologist',
        qualifications: 'MBBS, MD (Medicine), DM (Gastroenterology)',
        experience: 13,
        consultationFee: 750,
        about: 'Gastroenterologist with expertise in liver diseases, IBD, and advanced endoscopy. Specializes in digestive system disorders.',
        clinicAddress: {
          street: '90 Ruby Hospital Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700078',
          fullAddress: '90 Ruby Hospital Road, Kolkata, West Bengal 700078'
        },
        availableSlots: [
          { day: 'Monday', startTime: '12:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '12:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Friday', startTime: '12:00', endTime: '18:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 178,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[10]._id,
        specialization: 'Ophthalmologist',
        qualifications: 'MBBS, MS (Ophthalmology), Fellowship in Cataract & Refractive Surgery',
        experience: 10,
        consultationFee: 600,
        about: 'Eye specialist with expertise in cataract surgery, LASIK, and retina disorders. Expert in pediatric ophthalmology.',
        clinicAddress: {
          street: '45 Chowringhee Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700071',
          fullAddress: '45 Chowringhee Road, Kolkata, West Bengal 700071'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '10:00', endTime: '18:00', slotDuration: 20 },
          { day: 'Thursday', startTime: '10:00', endTime: '18:00', slotDuration: 20 },
          { day: 'Saturday', startTime: '09:00', endTime: '15:00', slotDuration: 20 }
        ],
        rating: 4.8,
        totalReviews: 267,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[11]._id,
        specialization: 'Dentist',
        qualifications: 'BDS, MDS (Orthodontics), Fellowship in Implantology',
        experience: 7,
        consultationFee: 500,
        about: 'Dental surgeon specializing in orthodontics, dental implants, and cosmetic dentistry. Expert in root canal treatments.',
        clinicAddress: {
          street: '23 Lake Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700029',
          fullAddress: '23 Lake Road, Kolkata, West Bengal 700029'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Tuesday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Friday', startTime: '10:00', endTime: '19:00', slotDuration: 30 }
        ],
        rating: 4.6,
        totalReviews: 223,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[12]._id,
        specialization: 'Psychiatrist',
        qualifications: 'MBBS, MD (Psychiatry)',
        experience: 12,
        consultationFee: 800,
        about: 'Mental health specialist treating depression, anxiety, OCD, and other psychiatric disorders. Expert in counseling and psychotherapy.',
        clinicAddress: {
          street: '67 Sarat Bose Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700020',
          fullAddress: '67 Sarat Bose Road, Kolkata, West Bengal 700020'
        },
        availableSlots: [
          { day: 'Monday', startTime: '11:00', endTime: '19:00', slotDuration: 45 },
          { day: 'Wednesday', startTime: '11:00', endTime: '19:00', slotDuration: 45 },
          { day: 'Friday', startTime: '11:00', endTime: '19:00', slotDuration: 45 }
        ],
        rating: 4.9,
        totalReviews: 145,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[13]._id,
        specialization: 'Pulmonologist',
        qualifications: 'MBBS, MD (Respiratory Medicine), Fellowship in Critical Care',
        experience: 11,
        consultationFee: 700,
        about: 'Lung specialist treating asthma, COPD, tuberculosis, and sleep disorders. Expert in bronchoscopy and critical care.',
        clinicAddress: {
          street: '34 Deshapriya Park',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700033',
          fullAddress: '34 Deshapriya Park, Kolkata, West Bengal 700033'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '10:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '10:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '09:00', endTime: '13:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 134,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[14]._id,
        specialization: 'Urologist',
        qualifications: 'MBBS, MS (Urology), MCh (Urology)',
        experience: 15,
        consultationFee: 850,
        about: 'Urologist specializing in kidney stones, prostate disorders, and male infertility. Expert in minimally invasive urological surgeries.',
        clinicAddress: {
          street: '12 Park Circus',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '12 Park Circus, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Monday', startTime: '11:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '11:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Friday', startTime: '11:00', endTime: '18:00', slotDuration: 30 }
        ],
        rating: 4.8,
        totalReviews: 187,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[15]._id,
        specialization: 'Endocrinologist',
        qualifications: 'MBBS, MD (Medicine), DM (Endocrinology)',
        experience: 10,
        consultationFee: 700,
        about: 'Endocrinologist treating thyroid disorders, hormonal imbalances, and metabolic diseases. Expert in diabetes and PCOS management.',
        clinicAddress: {
          street: '56 Hazra Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700026',
          fullAddress: '56 Hazra Road, Kolkata, West Bengal 700026'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '10:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Friday', startTime: '10:00', endTime: '17:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 145,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[16]._id,
        specialization: 'Nephrologist',
        qualifications: 'MBBS, MD (Medicine), DM (Nephrology)',
        experience: 14,
        consultationFee: 800,
        about: 'Kidney specialist treating chronic kidney disease, dialysis management, and kidney transplant care. Expert in hypertension.',
        clinicAddress: {
          street: '78 Shakespeare Sarani',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '78 Shakespeare Sarani, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '11:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '11:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '10:00', endTime: '14:00', slotDuration: 30 }
        ],
        rating: 4.8,
        totalReviews: 198,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[17]._id,
        specialization: 'Rheumatologist',
        qualifications: 'MBBS, MD (Medicine), DM (Rheumatology)',
        experience: 11,
        consultationFee: 750,
        about: 'Rheumatologist specializing in arthritis, autoimmune diseases, and joint disorders. Expert in managing lupus and rheumatoid arthritis.',
        clinicAddress: {
          street: '34 Bhowanipore',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700025',
          fullAddress: '34 Bhowanipore, Kolkata, West Bengal 700025'
        },
        availableSlots: [
          { day: 'Monday', startTime: '09:00', endTime: '16:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '09:00', endTime: '16:00', slotDuration: 30 },
          { day: 'Friday', startTime: '09:00', endTime: '16:00', slotDuration: 30 }
        ],
        rating: 4.6,
        totalReviews: 123,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[18]._id,
        specialization: 'Oncologist',
        qualifications: 'MBBS, MD (Medicine), DM (Medical Oncology)',
        experience: 16,
        consultationFee: 1000,
        about: 'Cancer specialist with expertise in chemotherapy, immunotherapy, and targeted therapy. Compassionate care for all cancer types.',
        clinicAddress: {
          street: '12 Hindustan Park',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700029',
          fullAddress: '12 Hindustan Park, Kolkata, West Bengal 700029'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '10:00', endTime: '17:00', slotDuration: 45 },
          { day: 'Thursday', startTime: '10:00', endTime: '17:00', slotDuration: 45 },
          { day: 'Saturday', startTime: '09:00', endTime: '13:00', slotDuration: 45 }
        ],
        rating: 4.9,
        totalReviews: 256,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[19]._id,
        specialization: 'Radiologist',
        qualifications: 'MBBS, MD (Radiology), Fellowship in Interventional Radiology',
        experience: 12,
        consultationFee: 600,
        about: 'Radiologist expert in diagnostic imaging including CT, MRI, ultrasound, and X-ray interpretation. Interventional radiology specialist.',
        clinicAddress: {
          street: '89 Beckbagan',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '89 Beckbagan, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Monday', startTime: '08:00', endTime: '16:00', slotDuration: 30 },
          { day: 'Tuesday', startTime: '08:00', endTime: '16:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '08:00', endTime: '16:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '08:00', endTime: '16:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 189,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[20]._id,
        specialization: 'Anesthesiologist',
        qualifications: 'MBBS, MD (Anesthesiology), Fellowship in Critical Care',
        experience: 13,
        consultationFee: 700,
        about: 'Anesthesiologist with expertise in pain management, surgical anesthesia, and critical care. Specialist in regional anesthesia.',
        clinicAddress: {
          street: '45 Rafi Ahmed Kidwai Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700016',
          fullAddress: '45 Rafi Ahmed Kidwai Road, Kolkata, West Bengal 700016'
        },
        availableSlots: [
          { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
          { day: 'Friday', startTime: '09:00', endTime: '17:00', slotDuration: 30 }
        ],
        rating: 4.8,
        totalReviews: 167,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[21]._id,
        specialization: 'Pathologist',
        qualifications: 'MBBS, MD (Pathology), Fellowship in Hematopathology',
        experience: 15,
        consultationFee: 500,
        about: 'Pathologist specializing in disease diagnosis through laboratory testing. Expert in blood disorders and cancer pathology.',
        clinicAddress: {
          street: '23 Rawdon Street',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '23 Rawdon Street, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Tuesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '10:00', endTime: '18:00', slotDuration: 30 }
        ],
        rating: 4.6,
        totalReviews: 142,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[22]._id,
        specialization: 'Ayurvedic Doctor',
        qualifications: 'BAMS, MD (Ayurveda), Panchakarma Specialist',
        experience: 9,
        consultationFee: 400,
        about: 'Ayurvedic practitioner offering holistic treatment through herbs, diet, and lifestyle. Expert in Panchakarma therapies and chronic disease management.',
        clinicAddress: {
          street: '67 Lansdowne Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700029',
          fullAddress: '67 Lansdowne Road, Kolkata, West Bengal 700029'
        },
        availableSlots: [
          { day: 'Monday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Tuesday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '10:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Friday', startTime: '10:00', endTime: '19:00', slotDuration: 30 }
        ],
        rating: 4.5,
        totalReviews: 218,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[23]._id,
        specialization: 'Homeopathic Doctor',
        qualifications: 'BHMS, MD (Homeopathy)',
        experience: 8,
        consultationFee: 350,
        about: 'Homeopathic physician treating acute and chronic conditions with safe, natural remedies. Expert in constitutional homeopathy.',
        clinicAddress: {
          street: '34 Woodburn Park',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700020',
          fullAddress: '34 Woodburn Park, Kolkata, West Bengal 700020'
        },
        availableSlots: [
          { day: 'Monday', startTime: '11:00', endTime: '20:00', slotDuration: 30 },
          { day: 'Tuesday', startTime: '11:00', endTime: '20:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '11:00', endTime: '20:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '11:00', endTime: '20:00', slotDuration: 30 },
          { day: 'Friday', startTime: '11:00', endTime: '20:00', slotDuration: 30 }
        ],
        rating: 4.4,
        totalReviews: 195,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[24]._id,
        specialization: 'Physiotherapist',
        qualifications: 'BPT, MPT (Orthopedics), Certified Sports Physiotherapist',
        experience: 10,
        consultationFee: 450,
        about: 'Physiotherapist specializing in sports injuries, post-surgical rehabilitation, and chronic pain management. Expert in manual therapy.',
        clinicAddress: {
          street: '12 Loudon Street',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '12 Loudon Street, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Monday', startTime: '08:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Tuesday', startTime: '08:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Wednesday', startTime: '08:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Thursday', startTime: '08:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Friday', startTime: '08:00', endTime: '18:00', slotDuration: 45 },
          { day: 'Saturday', startTime: '08:00', endTime: '14:00', slotDuration: 45 }
        ],
        rating: 4.7,
        totalReviews: 234,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[25]._id,
        specialization: 'Cardiologist',
        qualifications: 'MBBS, MD (Cardiology), Fellowship in Cardiac Electrophysiology',
        experience: 17,
        consultationFee: 900,
        about: 'Senior cardiologist with expertise in arrhythmias, pacemaker implantation, and heart failure management. Trained internationally.',
        clinicAddress: {
          street: '89 Circus Avenue',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '89 Circus Avenue, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Tuesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '09:00', endTime: '13:00', slotDuration: 30 }
        ],
        rating: 4.9,
        totalReviews: 289,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[26]._id,
        specialization: 'Dentist',
        qualifications: 'BDS, MDS (Prosthodontics), Implant Specialist',
        experience: 12,
        consultationFee: 600,
        about: 'Prosthodontist specializing in dental implants, crowns, bridges, and dentures. Expert in smile makeovers and full mouth rehabilitation.',
        clinicAddress: {
          street: '45 Prince Anwar Shah Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700033',
          fullAddress: '45 Prince Anwar Shah Road, Kolkata, West Bengal 700033'
        },
        availableSlots: [
          { day: 'Monday', startTime: '09:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Tuesday', startTime: '09:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '09:00', endTime: '18:00', slotDuration: 30 },
          { day: 'Thursday', startTime: '09:00', endTime: '18:00', slotDuration: 30 }
        ],
        rating: 4.7,
        totalReviews: 201,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[27]._id,
        specialization: 'Pediatrician',
        qualifications: 'MBBS, MD (Pediatrics), Fellowship in Pediatric Intensive Care',
        experience: 11,
        consultationFee: 550,
        about: 'Pediatric intensivist providing comprehensive child care from newborn to adolescence. Expert in critical care and emergency pediatrics.',
        clinicAddress: {
          street: '23 Jodhpur Park',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700068',
          fullAddress: '23 Jodhpur Park, Kolkata, West Bengal 700068'
        },
        availableSlots: [
          { day: 'Monday', startTime: '09:00', endTime: '18:00', slotDuration: 20 },
          { day: 'Tuesday', startTime: '09:00', endTime: '18:00', slotDuration: 20 },
          { day: 'Thursday', startTime: '09:00', endTime: '18:00', slotDuration: 20 },
          { day: 'Friday', startTime: '09:00', endTime: '18:00', slotDuration: 20 },
          { day: 'Saturday', startTime: '09:00', endTime: '14:00', slotDuration: 20 }
        ],
        rating: 4.8,
        totalReviews: 278,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[28]._id,
        specialization: 'Dermatologist',
        qualifications: 'MBBS, MD (Dermatology), Fellowship in Hair Transplant',
        experience: 9,
        consultationFee: 650,
        about: 'Dermatologist and hair transplant surgeon. Expert in treating hair loss, acne, skin allergies, and aesthetic procedures.',
        clinicAddress: {
          street: '56 Mudiali',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700017',
          fullAddress: '56 Mudiali, Kolkata, West Bengal 700017'
        },
        availableSlots: [
          { day: 'Monday', startTime: '11:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Wednesday', startTime: '11:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Friday', startTime: '11:00', endTime: '19:00', slotDuration: 30 },
          { day: 'Saturday', startTime: '10:00', endTime: '15:00', slotDuration: 30 }
        ],
        rating: 4.6,
        totalReviews: 167,
        isApproved: true,
        isAvailable: true
      },
      {
        userId: doctorUsers[29]._id,
        specialization: 'General Physician',
        qualifications: 'MBBS, MD (Internal Medicine), Geriatric Care Specialist',
        experience: 14,
        consultationFee: 450,
        about: 'Family physician with special interest in geriatric care. Comprehensive primary healthcare for all ages with focus on preventive medicine.',
        clinicAddress: {
          street: '78 VIP Road',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700052',
          fullAddress: '78 VIP Road, Kolkata, West Bengal 700052'
        },
        availableSlots: [
          { day: 'Monday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Tuesday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Wednesday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Thursday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Friday', startTime: '08:00', endTime: '20:00', slotDuration: 15 },
          { day: 'Saturday', startTime: '08:00', endTime: '16:00', slotDuration: 15 },
          { day: 'Sunday', startTime: '09:00', endTime: '13:00', slotDuration: 15 }
        ],
        rating: 4.8,
        totalReviews: 412,
        isApproved: true,
        isAvailable: true
      }
    ]);

    // Create sample appointments
    console.log('Creating sample appointments...');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    await Appointment.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        appointmentDate: tomorrow,
        timeSlot: { startTime: '10:00', endTime: '10:30' },
        status: 'confirmed',
        reasonForVisit: 'Chest pain and regular cardiac checkup',
        symptoms: 'Occasional chest discomfort, breathlessness during exercise'
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        appointmentDate: tomorrow,
        timeSlot: { startTime: '11:00', endTime: '11:30' },
        status: 'pending',
        reasonForVisit: 'Skin allergy and acne treatment',
        symptoms: 'Itchy rashes on face and arms, acne breakout'
      },
      {
        patientId: patients[2]._id,
        doctorId: doctors[2]._id,
        appointmentDate: dayAfterTomorrow,
        timeSlot: { startTime: '09:00', endTime: '09:20' },
        status: 'confirmed',
        reasonForVisit: 'Child vaccination and growth checkup',
        symptoms: 'Routine vaccination for 3-year-old child'
      },
      {
        patientId: patients[3]._id,
        doctorId: doctors[4]._id,
        appointmentDate: dayAfterTomorrow,
        timeSlot: { startTime: '08:00', endTime: '08:15' },
        status: 'pending',
        reasonForVisit: 'General health checkup',
        symptoms: 'Annual health screening, diabetes checkup'
      },
      {
        patientId: patients[0]._id,
        doctorId: doctors[6]._id,
        appointmentDate: nextWeek,
        timeSlot: { startTime: '09:00', endTime: '09:30' },
        status: 'pending',
        reasonForVisit: 'Blood sugar monitoring',
        symptoms: 'High blood sugar levels, family history of diabetes'
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[10]._id,
        appointmentDate: nextWeek,
        timeSlot: { startTime: '10:00', endTime: '10:20' },
        status: 'pending',
        reasonForVisit: 'Eye checkup and vision problems',
        symptoms: 'Blurred vision, difficulty reading'
      }
    ]);

    console.log('✅ Seed data created successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nAdmin:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');
    console.log('\nPatients:');
    console.log('  Email: rajesh@example.com | Password: patient123');
    console.log('  Email: priya@example.com | Password: patient123');
    console.log('  Email: amit@example.com | Password: patient123');
    console.log('  Email: sneha@example.com | Password: patient123');
    console.log('\nDoctors (30 specialists):');
    console.log('  Email: ananya.mukherjee@example.com | Password: doctor123 | Cardiologist');
    console.log('  Email: rajiv.banerjee@example.com | Password: doctor123 | Dermatologist');
    console.log('  Email: priyanka.sen@example.com | Password: doctor123 | Pediatrician');
    console.log('  Email: amit.ghosh@example.com | Password: doctor123 | Orthopedic');
    console.log('  Email: sunita.sharma@example.com | Password: doctor123 | General Physician');
    console.log('  Email: vikram.malhotra@example.com | Password: doctor123 | Gynecologist');
    console.log('  Email: kavita.roy@example.com | Password: doctor123 | Diabetologist');
    console.log('  Email: sanjay.bose@example.com | Password: doctor123 | ENT Specialist');
    console.log('  Email: meera.chakraborty@example.com | Password: doctor123 | Neurologist');
    console.log('  Email: arun.das@example.com | Password: doctor123 | Gastroenterologist');
    console.log('  Email: ritu.kapoor@example.com | Password: doctor123 | Ophthalmologist');
    console.log('  Email: soumya.dutta@example.com | Password: doctor123 | Dentist');
    console.log('  Email: karan.verma@example.com | Password: doctor123 | Psychiatrist');
    console.log('  Email: nisha.gupta@example.com | Password: doctor123 | Pulmonologist');
    console.log('  Email: rahul.chatterjee@example.com | Password: doctor123 | Urologist');
    console.log('  Email: deepa.mishra@example.com | Password: doctor123 | Endocrinologist');
    console.log('  Email: arjun.saxena@example.com | Password: doctor123 | Nephrologist');
    console.log('  Email: pooja.mehta@example.com | Password: doctor123 | Rheumatologist');
    console.log('  Email: suresh.iyer@example.com | Password: doctor123 | Oncologist');
    console.log('  Email: anjali.reddy@example.com | Password: doctor123 | Radiologist');
    console.log('  Email: ramesh.nair@example.com | Password: doctor123 | Anesthesiologist');
    console.log('  Email: swati.desai@example.com | Password: doctor123 | Pathologist');
    console.log('  Email: manoj.kumar@example.com | Password: doctor123 | Ayurvedic Doctor');
    console.log('  Email: rekha.joshi@example.com | Password: doctor123 | Homeopathic Doctor');
    console.log('  Email: vivek.pandey@example.com | Password: doctor123 | Physiotherapist');
    console.log('  Email: neha.agarwal@example.com | Password: doctor123 | Cardiologist');
    console.log('  Email: siddharth.rao@example.com | Password: doctor123 | Dentist');
    console.log('  Email: tanvi.bhatt@example.com | Password: doctor123 | Pediatrician');
    console.log('  Email: ashok.singh@example.com | Password: doctor123 | Dermatologist');
    console.log('  Email: pallavi.sinha@example.com | Password: doctor123 | General Physician');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
