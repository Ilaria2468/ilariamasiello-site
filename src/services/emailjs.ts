import emailjs from '@emailjs/browser';

emailjs.init("zhVqQ_IlYs504ntAc");

export const sendEmail = async (templateParams: any) => {
  try {
    const result = await emailjs.send(
      'service_bo2mefn',
      'template_j42ucns',
      templateParams
    );
    return result;
  } catch (error) {
    throw error;
  }
}; 