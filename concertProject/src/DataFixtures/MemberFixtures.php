<?php

namespace App\DataFixtures;

use App\Entity\Member;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MemberFixtures extends Fixture
{
    public const KORN_1 = 'a1';
    public const KORN_2 = 'a2';
    public const KORN_3 = 'a3';
    public const KORN_4 = 'a4';
    public const KORN_5 = 'a5';

    public function load(ObjectManager $manager)
    {
        $a1 = new Member();
        $a1->setName('Jonathan')
            ->setFirstName('Davies')
            ->setjob('Chanteur')
            ->setPicture('jonathanDavies.jpg');
        $manager->persist($a1);

        $a2 = new Member();
        $a2->setName('Reginald')
            ->setFirstName('Arvizu')
            ->setjob('Bassiste')
            ->setPicture('reginaldArvizu.jpg');
        $manager->persist($a2);

        $a3 = new Member();
        $a3->setName('James')
            ->setFirstName('Shaffer')
            ->setjob('Guitariste')
            ->setPicture('jamesShaffer.jpg');
        $manager->persist($a3);

        $a4 = new Member();
        $a4->setName('Brian')
            ->setFirstName('Welch')
            ->setjob('Guitariste')
            ->setPicture('brianWelch.jpg');
        $manager->persist($a4);

        $a5 = new Member();
        $a5->setName('Ray')
            ->setFirstName('Luzier')
            ->setJob('Batteur')
            ->setPicture('rayLuzier.jpg');
        $manager->persist($a5);

        $manager->flush();

        // other fixtures can get this object using the UserFixtures::ADMIN_USER_REFERENCE constant
        $this->addReference(self::KORN_1, $a1);
        $this->addReference(self::KORN_2, $a2);
        $this->addReference(self::KORN_3, $a3);
        $this->addReference(self::KORN_4, $a4);
        $this->addReference(self::KORN_5, $a5);
    }
}
