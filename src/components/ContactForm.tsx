import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type FormInputs = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  React.useEffect(() => {
    emailjs.init("zhVqQ_IlYs504ntAc");
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_bo2mefn',
        'template_j42ucns',
        {
          from_name: data.name,
          from_email: data.email,
          service: data.service,
          message: data.message,
        }
      );

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Errore invio email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border-2 border-[#ea8f90]/30"
    >
      <div className="space-y-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Il nome è obbligatorio' })}
            className="w-full px-4 py-2 border border-[#ea8f90]/30 rounded-md focus:ring-[#ea8f90] focus:border-[#ea8f90] transition-colors"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email è obbligatoria',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Indirizzo email non valido',
              },
            })}
            className="w-full px-4 py-2 border border-[#ea8f90]/30 rounded-md focus:ring-[#ea8f90] focus:border-[#ea8f90] transition-colors"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Servizio */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Servizio
          </label>
          <select
            id="service"
            {...register('service', { required: 'Seleziona un servizio' })}
            className="w-full px-4 py-2 border border-[#ea8f90]/30 rounded-md focus:ring-[#ea8f90] focus:border-[#ea8f90] transition-colors"
            disabled={isSubmitting}
          >
            <option value="">Seleziona un servizio</option>
            <option value="taglio">Taglio</option>
            <option value="colore">Colore</option>
            <option value="piega">Piega</option>
            <option value="trattamento">Trattamento</option>
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
          )}
        </div>

        {/* Messaggio */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Messaggio
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className="w-full px-4 py-2 border border-[#ea8f90]/30 rounded-md focus:ring-[#ea8f90] focus:border-[#ea8f90] transition-colors resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Pulsante Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ea8f90] text-white py-3 px-6 rounded-md hover:bg-[#ea8f90]/90 transition-colors duration-200 font-medium flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Invio in corso...
              </>
            ) : (
              'Invia Messaggio'
            )}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="mt-2 text-sm text-green-600">
            Messaggio inviato con successo!
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-2 text-sm text-red-600">
            Si è verificato un errore. Riprova più tardi.
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm; 