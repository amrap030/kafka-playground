import { Kafka, logLevel } from 'kafkajs';
import serialize from './serialize';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:29092', '127.0.0.1:39092'],
  logLevel: logLevel.ERROR,
});
kafka.logger().setLogLevel(logLevel.WARN);

const consumer = kafka.consumer({ groupId: 'my-group' }); // id for consumer group

const consume = async () => {
  // remember to connect and disconnect when you are done
  await consumer.connect();
  await consumer.subscribe({ topic: 'public.users', fromBeginning: true });
  // await consumer.subscribe({ topic: 'public.groups', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value)
        console.log({
          topic,
          partition,
          key: message?.key?.toString(),
          value: serialize.fromBuffer(message.value),
          headers: message.headers,
        });
    },
  });
};

consume();
