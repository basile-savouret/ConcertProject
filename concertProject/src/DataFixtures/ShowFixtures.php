<?php

namespace App\DataFixtures;

use App\Entity\Show;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ShowFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $ch1 = new Show();
        $ch1->setTourName('The incredible show')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '05/11/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch2 = new Show();
        $ch2->setTourName('The incredible show 2')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '13/05/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch3 = new Show();
        $ch3->setTourName('The incredible show 3')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '22/03/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch4 = new Show();
        $ch4->setTourName('The incredible show 4')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '07/04/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch5 = new Show();
        $ch5->setTourName('The incredible show 5')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '15/06/2018')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch6 = new Show();
        $ch6->setTourName('The incredible show 6')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '15/08/2018')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch7 = new Show();
        $ch7->setTourName('The incredible show 7')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '12/08/2018')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch8 = new Show();
        $ch8->setTourName('The incredible show 8')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '01/09/2018')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch9 = new Show();
        $ch9->setTourName('The incredible show 9')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '29/01/2018')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch10 = new Show();
        $ch10->setTourName('The incredible show 10')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '11/12/2018')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch11 = new Show();
        $ch11->setTourName('The incredible show 11')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '25/04/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch12 = new Show();
        $ch12->setTourName('The incredible show 12')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '07/04/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch13 = new Show();
        $ch13->setTourName('The incredible show 13')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '12/07/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch14 = new Show();
        $ch14->setTourName('The incredible show 14')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '04/10/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));
        $ch15 = new Show();
        $ch15->setTourName('The incredible show 15')
            ->setDate((\DateTime::createFromFormat("d/m/Y", '20/02/2021')->getTimestamp()*1000))
            ->setHall($this->getReference(HallFixtures::ROOM_1))
            ->setBand($this->getReference(BandFixture::BAND_1));

        $manager->persist($ch1);
        $manager->persist($ch2);
        $manager->persist($ch3);
        $manager->persist($ch4);
        $manager->persist($ch5);
        $manager->persist($ch6);
        $manager->persist($ch7);
        $manager->persist($ch8);
        $manager->persist($ch9);
        $manager->persist($ch10);
        $manager->persist($ch11);
        $manager->persist($ch12);
        $manager->persist($ch13);
        $manager->persist($ch14);
        $manager->persist($ch15);

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            HallFixtures::class,
            BandFixture::class,
        );
    }
}
