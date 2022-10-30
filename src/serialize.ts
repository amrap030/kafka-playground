import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  name: 'User',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
  ],
});
