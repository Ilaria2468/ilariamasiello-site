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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Il nome è obbligatorio' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email è obbligatoria',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Indirizzo email non valido',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Servizio
          </label>
          <select
            id="service"
            {...register('service', { required: 'Seleziona un servizio' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
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

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Messaggio
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isSubmitting ? 'bg-[#ea8f90]/70' : 'bg-[#ea8f90] hover:bg-[#ea8f90]/90'}`}
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
      </form>
    </div>
  );
};

export default ContactForm; 