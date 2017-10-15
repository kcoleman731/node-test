#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var Kafka = require('node-rdkafka');

program
  .version('0.1.0')
  .option('-p, --port', 'Port')
  .parse(process.argv);

if (program.port) {
    var port = program.args[0]
    var portString = `${port}:9092`
    console.log("Port string: ", portString)
    var producer = new Kafka.Producer({
        'metadata.broker.list': portString
    });

    console.log('Taste test cheese');
    producer.connect();
    producer.on('ready', function() {
       console.log("Producer is ready")
       try {
        console.log("Producing Message!")
        producer.produce('test2', null, new Buffer('Awesome message'), 'Stormwind', Date.now());
      } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
      }
    });

    // Any errors we encounter, including connection errors
    producer.on('event.error', function(err) {
        console.error('Error from producer');
        console.error(err);
    })

    producer.on('delivery-report', function(err) {
        console.error('Report from producer');
        console.error(err);
    })
}

var kafka2 = require('kafka-node')

if (program.port) {
    console.log("CONNECTING 2ND Client")
    var client = new kafka2.KafkaClient({ kafkaHost: 'localhost:9092' });
    client.on('connect', function () {
        console.log("CONNECTED 2ND CLIENT")
    });
    client.on('error', function (err) {
        console.log("CONNECTED 2ND CLIEN ERR", err)
    });
}