<?php

namespace App\DataFixtures;

use App\Entity\Hall;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class HallFixtures extends Fixture
{
    public const ROOM_1 = 'h1';
    public const ROOM_2 = 'h2';
    public const ROOM_3 = 'h3';

    public function load(ObjectManager $manager)
    {
        $h1 = new Hall();
        $h1->setName('Red Hall')
            ->setCapacity(500)
            ->setCity("Montpellier")
            ->setAddress("3 rue du grand duc");
        $manager->persist($h1);

        $h2 = new Hall();
        $h2->setName('MegaBigHall')
            ->setCapacity(1500)
            ->setCity("Paris")
            ->setAddress("18 avenue Louis Ravas");
        $manager->persist($h2);

        $h3 = new Hall();
        $h3->setName('Grease Hall')
            ->setCapacity(500)
            ->setCity("Lyon")
            ->setAddress("22 rue saint honoré");
        $manager->persist($h3);

        $manager->flush();

        // other fixtures can get this object using the UserFixtures::ADMIN_USER_REFERENCE constant
        $this->addReference(self::ROOM_1, $h1);
        $this->addReference(self::ROOM_2, $h2);
        $this->addReference(self::ROOM_3, $h3);
    }
}
