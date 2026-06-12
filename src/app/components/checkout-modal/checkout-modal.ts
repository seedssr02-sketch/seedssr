import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { CheckoutService } from '../../services/checkout.service';

interface CheckoutForm {
  name: string;
  phone: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  paymentMethod: 'debit' | 'credit' | 'pix' | '';
}

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.html',
  styleUrl: './checkout-modal.scss',
})
export class CheckoutModalComponent {
  private cart = inject(CartService);
  private whatsapp = inject(WhatsappService);
  private checkoutService = inject(CheckoutService);

  isOpen = this.checkoutService.isOpen;
  isLoadingCep = signal(false);
  cepError = signal('');

  form = signal<CheckoutForm>({
    name: '',
    phone: '',
    cep: '',
    address: '',
    city: '',
    state: '',
    paymentMethod: '',
  });

  paymentMethods = [
    { id: 'debit', label: 'Débito' },
    { id: 'credit', label: 'Crédito' },
    { id: 'pix', label: 'PIX' },
  ];

  isFormValid = computed(() => {
    const f = this.form();
    return (
      f.name.trim() !== '' &&
      f.phone.trim() !== '' &&
      f.cep.trim() !== '' &&
      f.address.trim() !== '' &&
      f.city.trim() !== '' &&
      f.state.trim() !== '' &&
      f.paymentMethod !== ''
    );
  });

  updateField(field: keyof CheckoutForm, value: string) {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  close() {
    this.checkoutService.close();
  }

  async searchCep(cep: string) {
    if (cep.length !== 8) return;

    this.isLoadingCep.set(true);
    this.cepError.set('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        this.cepError.set('CEP não encontrado');
        this.isLoadingCep.set(false);
        return;
      }

      this.form.update((f) => ({
        ...f,
        address: data.logradouro,
        city: data.localidade,
        state: data.uf,
      }));
    } catch {
      this.cepError.set('Erro ao buscar CEP');
    } finally {
      this.isLoadingCep.set(false);
    }
  }

  onCepChange(cep: string) {
    this.form.update((f) => ({ ...f, cep }));
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      this.searchCep(cleanCep);
    }
  }

  submit() {
    if (!this.isFormValid()) return;

    const f = this.form();
    const items = this.cart.items();
    const subtotal = this.cart.subtotal();

    const msg =
      `*Dados de Entrega*\n` +
      `Nome: ${f.name}\n` +
      `Telefone: ${f.phone}\n` +
      `CEP: ${f.cep}\n` +
      `Endereço: ${f.address}\n` +
      `Cidade: ${f.city}\n` +
      `Estado: ${f.state}\n` +
      `Forma de Pagamento: ${this.getPaymentLabel(f.paymentMethod)}\n\n` +
      `${this.whatsapp.buildCartMessage(items, subtotal)}`;

    this.whatsapp.openChat(msg);
    this.close();
    this.cart.clear();
  }

  private getPaymentLabel(id: string): string {
    const method = this.paymentMethods.find((m) => m.id === id);
    return method ? method.label : '';
  }
}
