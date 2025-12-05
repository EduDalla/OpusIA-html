(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-hero-form]');
    if (!form) return;

    const submitButton = form.querySelector('[data-submit]');
    const statusBox = form.querySelector('[data-form-status]');
    const { emailService, emailTemplate, emailPublicKey } = form.dataset;

    const hasValidEmailConfig = [emailService, emailTemplate, emailPublicKey]
      .every(value => value && !value.includes('YOUR_'));

    const setStatus = (message, state = 'info') => {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.dataset.status = state;
      statusBox.hidden = false;
    };

    const toggleSubmitting = (isSubmitting) => {
      if (!submitButton) return;
      submitButton.disabled = isSubmitting;
      submitButton.dataset.loading = isSubmitting ? 'true' : 'false';
    };

    const ensureEmailJsReady = () => {
      if (!hasValidEmailConfig) {
        throw new Error('EmailJS não foi configurado. Atualize os data-attributes do formulário.');
      }
      if (!window.emailjs) {
        throw new Error('Biblioteca EmailJS não encontrada.');
      }
      if (!window.emailjs.__initialized) {
        emailjs.init(emailPublicKey);
        window.emailjs.__initialized = true;
      }
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      statusBox && (statusBox.hidden = true);

      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();

      if (!name || !email) {
        setStatus('Preencha seu nome e e-mail para receber o acesso.', 'error');
        return;
      }

      toggleSubmitting(true);

      try {
        ensureEmailJsReady();

        await emailjs.send(
          emailService,
          emailTemplate,
          {
            from_name: name,
            to_email: email,
            reply_to: email,
            hero_message: `Novo pedido de acesso de ${name} (${email}).`,
          }
        );

        form.reset();
        setStatus('Enviamos um e-mail com o seu próximo passo. Confira sua caixa de entrada!', 'success');
      } catch (error) {
        console.error('[Hero Form] Falha ao enviar e-mail:', error);
        setStatus('Não conseguimos enviar o e-mail agora. Tente novamente em instantes.', 'error');
      } finally {
        toggleSubmitting(false);
      }
    });
  });
})();
