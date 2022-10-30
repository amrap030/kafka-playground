//   {
//     topic: 'public.groups',
//     partitions: 10,
//     replicationFactor: 2,
//     configEntries: [
//       {
//         name: 'compression.type',
//         value: 'gzip',
//       },
//       {
//         name: 'min.compaction.lag.ms',
//         value: '50',
//       },
//     ],
//   },

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:29092', '127.0.0.1:39092'],
});

const admin = kafka.admin();

const createTopics = async () => {
  // remember to connect and disconnect when you are done
  await admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: 'public.users',
        numPartitions: 10, // default: -1 (uses broker `num.partitions` configuration)
        replicationFactor: 2, // default: -1 (uses broker `default.replication.factor` configuration)
      },
    ],
  });

  await admin.disconnect();
};

createTopics();
