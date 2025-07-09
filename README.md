
# 📅 Scheduly Frontend

> Um calendário moderno, animado e responsivo para agendamento de compromissos, inspirado no Microsoft Teams.

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```
2. Configure a variável de ambiente `VITE_API_URL` no arquivo `.env` com a URL da sua API.
3. Inicie o projeto:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

---

## 🧭 Fluxo de uso

1. **Visualização do calendário**: escolha entre modo semanal ou mensal.
2. **Agendamento**: clique em um horário (semana) ou dia (mês) para abrir o modal de novo compromisso.
3. **Preencha nome e descrição** e salve. O compromisso aparecerá no calendário.
4. **Editar/Excluir**: clique em um compromisso para editar ou deletar.
5. **Feedback**: toast de sucesso/erro aparece para cada ação.
6. **Responsivo**: no mobile, navegue entre os dias da semana individualmente.

---

## 🧩 Principais componentes

- **HomePage**: página principal, controla estado, transições e lógica geral.
- **CalendarHeader**: cabeçalho com navegação de datas e troca de visualização.
- **WeekCalendar**: calendário semanal com horários de 1 em 1 hora, responsivo.
- **MonthCalendar**: calendário mensal, mostra compromissos por dia.
- **AppointmentModal**: modal para criar, editar e excluir compromissos.
- **Toastify**: feedback visual para ações do usuário.

---

## 🎨 Estilo & Animações

- **TailwindCSS** para estilização.
- **Transições suaves** ao trocar de semana/mês.
- **Detalhes em azul** e fundo branco para visual clean.
- **Dias da semana fixos** no topo ao rolar.

---

## 📱 Responsividade

- No desktop: semana completa lado a lado.
- No mobile/tablet: navegação por dia, sem rolagem horizontal.

---

## 🛠️ Tecnologias

- React + TypeScript
- Vite
- TailwindCSS
- React Toastify
- React Query

---

## 💡 Dicas

- Para alterar cores, edite o `tailwind.config.js`.
- Para customizar horários, ajuste o array `hours` em `WeekCalendar.tsx`.
- O backend deve aceitar datas no formato ISO (ex: `2025-07-09T13:00:00.000Z`).

---

## ✨ Experimente!

1. Clique nos horários para criar compromissos.
2. Edite ou exclua clicando nos cards.
3. Troque entre semana e mês no topo.
4. Teste no celular para ver a responsividade.

---

## 👨‍💻 Estrutura de pastas

```
src/
  pages/
    HomePage/
      components/
        CalendarHeader.tsx
        WeekCalendar.tsx
        MonthCalendar.tsx
        AppointmentModal.tsx
        utils.ts
  hooks/
  contexts/
  providers/
  services/
  lib/
```

---

## 📝 Observações

- O projeto é apenas frontend, mas pode ser facilmente integrado a qualquer backend REST.
- Sinta-se à vontade para customizar e evoluir!

---

Feito com 💙 por [Seu Nome]
