import { Kafka, logLevel, Partitioners } from 'kafkajs';
import serialize from './serialize';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:29092', '127.0.0.1:39092'],
  logLevel: logLevel.ERROR,
});
kafka.logger().setLogLevel(logLevel.WARN);

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

const produce = async () => {
  // remember to connect and disconnect when you are done
  await producer.connect();

  const message = serialize.toBuffer({
    name: 'Kevin',
    email: 'kevin@mail.com',
  });

  await producer.send({
    topic: 'public.users',
    messages: [
      {
        key: 'User',
        value: message,
      },
    ],
  });
  await producer.disconnect();
};

produce();
