import React from 'react'
import format from 'date-fns/format';
import { Table } from '@mantine/core'

/*
  elements = {tid, date, description, debit, credit, balance}
*/
export function TransactionTable({ elements }) {
  const rows = elements.map((element) => (
    <Table.Tr key={element.tid}>
      <Table.Td>{element.bank}</Table.Td>
      <Table.Td>{format(element.date, 'dd/MM/yyyy')}</Table.Td>
      <Table.Td>{element.description.toUpperCase()}</Table.Td>
      <Table.Td>{element.debit}</Table.Td>
      <Table.Td>{element.credit}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Bank</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Debit</Table.Th>
          <Table.Th>Credit</Table.Th>
          <Table.Th>Balance</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}