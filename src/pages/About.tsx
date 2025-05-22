// pages/About.tsx
import Menu from '../components/Menu/Menu';
import { Table } from '../components/Table/Table';
import './Page.css'

export function About() {
  return (
    <section>
      <Menu/>

      <Table
        columns={[
          { header: 'Foto', accessor: 'imagem', type: 'image' },
          { header: 'Produto', accessor: 'nome', type: 'text' },
          { header: 'Preço', accessor: 'preco', type: 'number' },
          { header: 'Data', accessor: 'data', type: 'date' },
        ]}
        data={[
          {
            imagem: "https://impactosociedade.com.br/images/nupis_transparent.png",
            nome: 'Mouse sem fio Logitech MX Master 3S com ergonomia',
            preco: 489.9,
            data: '2025-04-14',
          },
          {
            imagem: "https://impactosociedade.com.br/images/nupis_transparent.png",
            nome: 'Mouse sem fio Logitech MX Master 3S com ergonomia',
            preco: 489.9,
            data: '2025-04-14',
          },
          {
            imagem: "https://impactosociedade.com.br/images/nupis_transparent.png",
            nome: 'Mouse sem fio Logitech MX Master 3S com ergonomia',
            preco: 489.9,
            data: '2025-04-14',
          },
        ]}
        actions={{
          visualizar: (item) => console.log('Visualizar:', item),
          editar: (item) => console.log('Editar:', item),
          excluir: (item) => console.log('Excluir:', item),
        }}
        width="40%"
      />

      <h2 className="page-title">Sobre o Livro Caixa</h2>

      <p>
        O <strong>Livro Caixa</strong> é um sistema prático e intuitivo desenvolvido para ajudar pessoas e pequenas empresas
        a gerenciar suas finanças com organização, segurança e agilidade.
      </p>

      <h3>Funcionalidades principais</h3>
      <ul>
        <li>✅ Registro de lançamentos de débito e crédito</li>
        <li>✅ Classificação por categorias e tipos de despesa</li>
        <li>✅ Visualização de extratos por período</li>
        <li>✅ Geração de relatórios e gráficos financeiros</li>
        <li>✅ Controle de saldo em tempo real</li>
        <li>✅ Cadastro de usuários e controle de acessos</li>
      </ul>

      <h3>Vantagens</h3>
      <ul>
        <li>📊 Interface simples e amigável</li>
        <li>🔒 Segurança na armazenagem dos dados</li>
        <li>📱 Responsivo e acessível em qualquer dispositivo</li>
        <li>⚙️ Integração com outros sistemas contábeis (futuro)</li>
        <li>📈 Acompanhamento da saúde financeira em tempo real</li>
      </ul>

      <p>
        Com o <strong>Livro Caixa</strong>, você tem total controle das suas finanças em um único lugar, de forma clara e acessível.
        Ideal para autônomos, microempreendedores e gestores de pequenos negócios.
      </p>
    </section>
  );
}
